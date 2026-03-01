"use client";

import Link from "next/link";
import { DragEvent, useEffect, useMemo, useState } from "react";
import { ConfirmModal } from "@/components/ConfirmModal";
import { IconWithFallback } from "@/components/IconWithFallback";
import { NurseCard } from "@/components/NurseCard";
import { useToast } from "@/components/ToastProvider";
import { useAppState } from "@/context/AppStateContext";
import { SceneResult } from "@/lib/state";

const BADGE_NAME = "Healthy Hero Badge";

type AvatarName = "Doggo" | "Kitty" | "BunBun" | "Foxy";

const avatarMeta: Record<AvatarName, { emoji: string; label: string }> = {
  Doggo: { emoji: "\u{1F436}", label: "Doggo" },
  Kitty: { emoji: "\u{1F431}", label: "Kitty" },
  BunBun: { emoji: "\u{1F430}", label: "BunBun" },
  Foxy: { emoji: "\u{1F98A}", label: "Foxy" },
};

const avatars = Object.keys(avatarMeta) as AvatarName[];

function isAvatarName(value: string): value is AvatarName {
  return avatars.includes(value as AvatarName);
}

function formatAvatar(avatar: AvatarName | string | null) {
  if (!avatar || !isAvatarName(avatar)) {
    return "Avatar";
  }

  return `${avatarMeta[avatar].emoji} ${avatarMeta[avatar].label}`;
}

function avatarListText() {
  return avatars.map((avatar) => formatAvatar(avatar)).join(" | ");
}

interface FeedbackState {
  scene: number;
  result: SceneResult;
  text: string;
}

interface ConfirmState {
  open: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  variant: "default" | "danger";
  pendingAction: (() => void) | null;
}

function SceneHud({ sceneIndex, goodChoices }: { sceneIndex: number; goodChoices: number }) {
  const progressPercent = Math.round((Math.min(sceneIndex, 4) / 4) * 100);
  const energyPercent = Math.round((goodChoices / 4) * 100);

  return (
    <div className="rounded-2xl border border-sky-200 bg-sky-50 p-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-sky-900">
          <IconWithFallback src="/icons/heart.svg" alt="Health" label="Health" className="h-4 w-4" />
          Health HUD
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-sky-900">
          <IconWithFallback src="/icons/glucose.svg" alt="Glucose" label="Glucose" className="h-4 w-4" />
          Energy: {energyPercent}%
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-sky-900">
          <IconWithFallback
            src="/icons/checklist.svg"
            alt="Scene Progress"
            label="Progress"
            className="h-4 w-4"
          />
          Scene {Math.min(Math.max(sceneIndex, 1), 4)} / 4
        </div>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-sky-100">
        <div className="h-full rounded-full bg-sky-500 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
      </div>
    </div>
  );
}

export default function InteractivePage() {
  const {
    state: {
      progress: { game, badges },
    },
    updateGame,
    recordSceneResult,
    awardBadge,
  } = useAppState();
  const { addToast } = useToast();

  const [isMobile, setIsMobile] = useState(false);
  const [plateItems, setPlateItems] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [confirmState, setConfirmState] = useState<ConfirmState>({
    open: false,
    title: "",
    message: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    variant: "default",
    pendingAction: null,
  });

  const sceneIndex = game.currentSceneIndex;

  useEffect(() => {
    const updateMobile = () => {
      const widthMobile = window.matchMedia("(max-width: 767px)").matches;
      const pointerCoarse = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(widthMobile || pointerCoarse);
    };

    updateMobile();
    window.addEventListener("resize", updateMobile);

    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  useEffect(() => {
    setPlateItems([]);
    setFeedback(null);
  }, [sceneIndex]);

  const goodChoices = useMemo(
    () => Object.values(game.lastResult).filter((result) => result === "good").length,
    [game.lastResult],
  );

  useEffect(() => {
    if (sceneIndex === 5 && goodChoices >= 3 && !badges.includes(BADGE_NAME)) {
      awardBadge(BADGE_NAME);
      addToast("Healthy Hero Badge awarded!", "success");
    }
  }, [addToast, awardBadge, badges, goodChoices, sceneIndex]);

  const openBadChoiceConfirm = (action: () => void, message?: string) => {
    setConfirmState({
      open: true,
      title: "Confirm choice",
      message: message ?? "Are you sure? You can go back and choose the safer option.",
      confirmText: "Confirm",
      cancelText: "Go Back",
      variant: "default",
      pendingAction: action,
    });
  };

  const triggerRewindConfirm = () => {
    setConfirmState({
      open: true,
      title: "Rewind Adventure",
      message: "Do you wish to rewind?",
      confirmText: "Rewind",
      cancelText: "Go Back",
      variant: "default",
      pendingAction: () => {
        updateGame((current) => ({
          ...current,
          currentSceneIndex: 0,
          completedScenes: [],
          lastResult: {},
        }));
        addToast("Adventure restarted.", "info");
      },
    });
  };

  const setAvatar = (avatar: AvatarName) => {
    updateGame((current) => ({ ...current, selectedAvatar: avatar }));
  };

  const startAdventure = () => {
    if (!game.selectedAvatar) {
      addToast("Choose an avatar first.", "error");
      return;
    }

    updateGame((current) => ({
      ...current,
      currentSceneIndex: 1,
      completedScenes: [],
      lastResult: {},
    }));
  };

  const completeScene = (scene: number, result: SceneResult, text: string) => {
    recordSceneResult(scene, result);
    setFeedback({ scene, result, text });
  };

  const nextScene = () => {
    if (!feedback) {
      return;
    }

    updateGame((current) => ({
      ...current,
      currentSceneIndex: Math.min(5, feedback.scene + 1),
    }));
  };

  const handleGenericDrop = (event: DragEvent<HTMLElement>, callback: (payload: string) => void) => {
    event.preventDefault();
    const payload = event.dataTransfer.getData("text/plain");
    if (payload) {
      callback(payload);
    }
  };

  const renderIntro = () => (
    <div className="space-y-4">
      <p className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">
        Welcome to Hypoglycemia Adventure! Choose your animal character to explore and learn safely:
      </p>
      <p className="rounded-xl border border-cyan-200 bg-cyan-50 p-3 text-sm font-semibold text-cyan-900">
        Characters (Players): {avatarListText()}
      </p>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {avatars.map((avatar) => (
          <button
            key={avatar}
            type="button"
            draggable={!isMobile}
            onDragStart={(event) => event.dataTransfer.setData("text/plain", avatar)}
            onClick={() => setAvatar(avatar)}
            className={`rounded-2xl border p-4 text-left transition ${
              game.selectedAvatar === avatar
                ? "border-sky-500 bg-sky-500 text-white"
                : "border-sky-200 bg-white text-sky-900 hover:bg-sky-50"
            }`}
          >
            <p className="text-xs font-semibold">Avatar</p>
            <p className="text-lg font-bold">{formatAvatar(avatar)}</p>
          </button>
        ))}
      </div>

      <div
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) =>
          handleGenericDrop(event, (avatar) => {
            if (isAvatarName(avatar)) {
              setAvatar(avatar);
              startAdventure();
            }
          })
        }
        className="rounded-3xl border-2 border-dashed border-emerald-300 bg-emerald-50 p-6 text-center"
      >
        <p className="text-sm font-semibold text-emerald-900">Start Adventure Portal</p>
        <p className="text-xs text-emerald-800">Desktop: drag your avatar chip here</p>
        <button
          type="button"
          onClick={startAdventure}
          className="mt-4 rounded-full bg-emerald-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-emerald-600"
        >
          Mobile: Start Adventure
        </button>
      </div>
    </div>
  );

  const renderSceneOne = () => {
    const nurseMood = feedback?.result === "bad" ? "sad" : "happy";

    return (
      <div className="space-y-4">
        <p className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">
          You wake up feeling dizzy and tired. You don&apos;t know why yet.
        </p>

        <div className="grid gap-4 lg:grid-cols-2">
          <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <h3 className="text-sm font-bold text-emerald-900">Choice A (Good): Check blood glucose</h3>
            <p className="mt-1 text-xs text-emerald-800">Pick the correct item from 3 choices.</p>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { id: "glucometer", label: "Glucometer" },
                { id: "toy", label: "Toy" },
                { id: "cup", label: "Cup" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  draggable={!isMobile}
                  onDragStart={(event) => event.dataTransfer.setData("text/plain", item.id)}
                  onClick={() => {
                    if (feedback) return;
                    if (item.id === "glucometer") {
                      completeScene(
                        1,
                        "good",
                        "Good job! Feeling dizzy or shaky could be hypoglycemia, which happens when your blood sugar drops too low. Checking your sugar is the first step to stay safe.",
                      );
                    } else {
                      openBadChoiceConfirm(() =>
                        completeScene(
                          1,
                          "bad",
                          "Are you sure? Feeling dizzy or weak might mean your sugar is low. It's safest to check.",
                        ),
                        "Are you sure? Feeling dizzy or weak might mean your sugar is low. It's safest to check.",
                      );
                    }
                  }}
                  className="rounded-xl border border-emerald-200 bg-white p-2 text-xs font-semibold text-emerald-900"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) =>
                handleGenericDrop(event, (itemId) => {
                  if (feedback) return;
                  if (itemId === "glucometer") {
                    completeScene(
                      1,
                      "good",
                      "Good job! Feeling dizzy or shaky could be hypoglycemia, which happens when your blood sugar drops too low. Checking your sugar is the first step to stay safe.",
                    );
                  } else {
                    openBadChoiceConfirm(() =>
                      completeScene(
                        1,
                        "bad",
                        "Are you sure? Feeling dizzy or weak might mean your sugar is low. It's safest to check.",
                      ),
                      "Are you sure? Feeling dizzy or weak might mean your sugar is low. It's safest to check.",
                    );
                  }
                })
              }
              className="mt-3 rounded-2xl border-2 border-dashed border-emerald-300 bg-white p-3 text-center text-xs font-semibold text-emerald-900"
            >
              Drop item here to check
            </div>
          </section>

          <section className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
            <h3 className="text-sm font-bold text-rose-900">Choice B (Bad): Ignore and sleep again</h3>
            <p className="mt-1 text-xs text-rose-800">Tap bed or drag avatar under blanket.</p>

            <div className="mt-3 flex items-center gap-2">
              <div
                draggable={!isMobile}
                onDragStart={(event) => {
                  if (game.selectedAvatar) {
                    event.dataTransfer.setData("text/plain", game.selectedAvatar);
                  }
                }}
                className="rounded-full border border-rose-300 bg-white px-3 py-1 text-xs font-semibold text-rose-900"
              >
                {formatAvatar(game.selectedAvatar)}
              </div>
              <button
                type="button"
                onClick={() => {
                  if (feedback) return;
                  openBadChoiceConfirm(() =>
                    completeScene(
                      1,
                      "bad",
                      "Are you sure? Feeling dizzy or weak might mean your sugar is low. It's safest to check.",
                    ),
                    "Are you sure? Feeling dizzy or weak might mean your sugar is low. It's safest to check.",
                  );
                }}
                className="rounded-full border border-rose-300 bg-white px-3 py-1 text-xs font-semibold text-rose-900"
              >
                Tap Bed
              </button>
            </div>

            <div
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) =>
                handleGenericDrop(event, () => {
                  if (feedback) return;
                  openBadChoiceConfirm(() =>
                    completeScene(
                      1,
                      "bad",
                      "Are you sure? Feeling dizzy or weak might mean your sugar is low. It's safest to check.",
                    ),
                    "Are you sure? Feeling dizzy or weak might mean your sugar is low. It's safest to check.",
                  );
                })
              }
              className="mt-3 rounded-2xl border-2 border-dashed border-rose-300 bg-white p-4 text-center text-sm font-semibold text-rose-900"
            >
              Bed / Blanket Zone
            </div>
          </section>
        </div>

        {feedback?.scene === 1 ? (
          <div className="space-y-3">
            <NurseCard mood={nurseMood} message={feedback.text} />
            <button
              type="button"
              onClick={nextScene}
              className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white"
            >
              Next Scene
            </button>
          </div>
        ) : null}
      </div>
    );
  };

  const renderSceneTwo = () => {
    const goodFoods = ["bread", "eggs", "fruit"];

    const handleFoodAction = (food: string) => {
      if (feedback) return;

      if (food === "candy" || food === "sugary-drink") {
        openBadChoiceConfirm(() =>
          completeScene(
            2,
            "bad",
            "Sugary snacks give quick energy but sugar may drop again. Balanced meals are safer. Want to drag healthy foods onto your plate instead?",
          ),
          "Sugary snacks give quick energy but sugar may drop again. Balanced meals are safer. Want to drag healthy foods onto your plate instead?",
        );
        return;
      }

      setPlateItems((previous) => {
        if (previous.includes(food)) {
          return previous;
        }

        const next = [...previous, food];
        const allGoodCollected = goodFoods.every((item) => next.includes(item));

        if (allGoodCollected) {
          window.setTimeout(() => {
            completeScene(
              2,
              "good",
              "Excellent! Balanced meals keep your sugar stable. Eating properly prevents hypoglycemia.",
            );
          }, 80);
        }

        return next;
      });
    };

    return (
      <div className="space-y-4">
        <p className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">
          You&apos;re about to eat breakfast. You might not know which foods help.
        </p>

        <div className="rounded-2xl border border-sky-200 bg-white p-4">
          <h3 className="text-sm font-bold text-sky-900">Drag or tap food items</h3>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { id: "bread", label: "Bread", good: true },
              { id: "eggs", label: "Eggs", good: true },
              { id: "fruit", label: "Fruit", good: true },
              { id: "candy", label: "Candy", good: false },
              { id: "sugary-drink", label: "Sugary Drink", good: false },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                draggable={!isMobile}
                onDragStart={(event) => event.dataTransfer.setData("text/plain", item.id)}
                onClick={() => handleFoodAction(item.id)}
                className={`rounded-xl border p-3 text-sm font-semibold transition ${
                  item.good
                    ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                    : "border-rose-200 bg-rose-50 text-rose-900"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => handleGenericDrop(event, handleFoodAction)}
          className="rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50 p-4"
        >
          <p className="text-sm font-bold text-amber-900">Breakfast plate (tray at bottom)</p>
          <div className="mt-2 flex min-h-20 flex-wrap gap-2 rounded-xl bg-white p-3">
            {plateItems.length > 0 ? (
              plateItems.map((food) => (
                <span
                  key={food}
                  className="rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900"
                >
                  {food}
                </span>
              ))
            ) : (
              <span className="text-xs text-amber-800">Drop bread + eggs + fruit here.</span>
            )}
          </div>
        </div>

        {feedback?.scene === 2 ? (
          <div className="space-y-3">
            <NurseCard mood={feedback.result === "good" ? "happy" : "sad"} message={feedback.text} />
            <button
              type="button"
              onClick={nextScene}
              className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white"
            >
              Next Scene
            </button>
          </div>
        ) : null}
      </div>
    );
  };

  const renderSceneThree = () => {
    const handleZoneChoice = (zone: "park" | "yoga" | "soccer" | "treadmill") => {
      if (feedback) return;

      if (zone === "park" || zone === "yoga") {
        completeScene(
          3,
          "good",
          "Good choice! Gentle activity is safe if sugar is low. Exercise can lower sugar, so check levels first.",
        );
      } else {
        openBadChoiceConfirm(() =>
          completeScene(
            3,
            "bad",
            "High-intensity activity can drop your sugar quickly. Are you sure? You can head to a safer activity area.",
          ),
          "High-intensity activity can drop your sugar quickly. Are you sure? You can head to a safer activity area.",
        );
      }
    };

    return (
      <div className="space-y-4">
        <p className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">
          It's playtime. Exercise can affect blood sugar, but you might not know how.
        </p>

        <div className="rounded-2xl border border-sky-200 bg-white p-4">
          <p className="text-sm text-sky-900">Drag your avatar or tap a zone.</p>
          <div
            draggable={!isMobile}
            onDragStart={(event) => event.dataTransfer.setData("text/plain", game.selectedAvatar ?? "avatar")}
            className="mt-3 inline-flex rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold text-sky-900"
          >
            {formatAvatar(game.selectedAvatar)}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { id: "park", label: "Park Path", good: true },
              { id: "yoga", label: "Yoga Mat", good: true },
              { id: "soccer", label: "Soccer Ball", good: false },
              { id: "treadmill", label: "Treadmill", good: false },
            ].map((zone) => (
              <button
                key={zone.id}
                type="button"
                onClick={() => handleZoneChoice(zone.id as "park" | "yoga" | "soccer" | "treadmill")}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => handleGenericDrop(event, () => handleZoneChoice(zone.id as "park" | "yoga" | "soccer" | "treadmill"))}
                className={`rounded-2xl border-2 border-dashed p-4 text-left ${
                  zone.good
                    ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                    : "border-rose-300 bg-rose-50 text-rose-900"
                }`}
              >
                <p className="text-sm font-bold">{zone.label}</p>
                <p className="text-xs">{zone.good ? "Light activity" : "Intense activity"}</p>
              </button>
            ))}
          </div>
        </div>

        {feedback?.scene === 3 ? (
          <div className="space-y-3">
            <NurseCard mood={feedback.result === "good" ? "happy" : "sad"} message={feedback.text} />
            <button
              type="button"
              onClick={nextScene}
              className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white"
            >
              Next Scene
            </button>
          </div>
        ) : null}
      </div>
    );
  };

  const renderSceneFour = () => (
    <div className="space-y-4">
      <p className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">
        You feel shaky, tired, and confused. You do not know what is happening.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => {
            if (feedback) return;
            completeScene(
              4,
              "good",
              "Correct! Quick sugar helps raise blood glucose safely. You're learning to respond to hypoglycemia.",
            );
          }}
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-left text-emerald-900"
        >
          <p className="text-sm font-bold">Good Choice</p>
          <p className="mt-1 text-sm">Click juice box or candy to character&apos;s mouth.</p>
          <div className="mt-3 flex gap-2">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold">Juice Box</span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold">Candy</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => {
            if (feedback) return;
            openBadChoiceConfirm(() =>
              completeScene(
                4,
                "bad",
                "Ignoring signs is dangerous. Hypoglycemia can make you faint. Are you sure?",
              ),
              "Ignoring signs is dangerous. Hypoglycemia can make you faint. Are you sure?",
            );
          }}
          className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-left text-rose-900"
        >
          <p className="text-sm font-bold">Bad Choice</p>
          <p className="mt-1 text-sm">Wait it out, I&apos;ll feel better eventually.</p>
        </button>
      </div>

      {feedback?.scene === 4 ? (
        <div className="space-y-3">
          <NurseCard mood={feedback.result === "good" ? "happy" : "sad"} message={feedback.text} />
          <button
            type="button"
            onClick={nextScene}
            className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-white"
          >
            View Ending
          </button>
        </div>
      ) : null}
    </div>
  );

  const renderEnding = () => {
    const earned = goodChoices >= 3;
    const hasBadge = badges.includes(BADGE_NAME);

    return (
      <div className="space-y-4">
        <p className="rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">
          Congratulations! You learned how to recognize and respond to hypoglycemia safely. Checking blood sugar, eating balanced meals, gentle activity, and responding to low sugar are important skills. Your animal character is happy and healthy today!
        </p>

        <NurseCard mood="happy" message="Do you wish to rewind?" />

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
          <h3 className="text-sm font-bold text-emerald-900">Adventure Summary</h3>
          <p className="mt-1 text-sm text-emerald-900">
            You made {goodChoices} safe choice{goodChoices === 1 ? "" : "s"} out of 4 scenes.
          </p>
          {earned ? (
            <div className="mt-3 rounded-xl border border-emerald-300 bg-white p-3 text-sm text-emerald-900">
              <p className="font-semibold">Badge unlocked: {BADGE_NAME}</p>
              <button
                type="button"
                onClick={() => awardBadge(BADGE_NAME)}
                className="mt-2 inline-flex items-center gap-2 rounded-full border border-emerald-300 px-3 py-1 text-xs font-bold"
              >
                <IconWithFallback
                  src="/icons/badge.svg"
                  alt="Healthy Hero Badge"
                  label="Badge"
                  className="h-4 w-4"
                />
                {hasBadge ? "Collected" : "Tap to collect"}
              </button>
              <p className="mt-2 text-xs">
                Tap the badge to collect it, then keep it in your Achievement Shelf.
              </p>
            </div>
          ) : (
            <p className="mt-3 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
              Try again to earn the badge.
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <p className="w-full text-sm text-sky-900">Try again to practice and learn more!</p>
          <button
            type="button"
            onClick={triggerRewindConfirm}
            className="rounded-full border border-sky-300 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-900"
          >
            Replay
          </button>
          <Link
            href="/dashboard"
            className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-sky-200 bg-white p-4">
        <div>
          <h1 className="text-2xl font-extrabold text-sky-950">Hypoglycemia Adventure</h1>
          <p className="text-sm text-sky-900">Clinic-safe choices, one scene at a time.</p>
        </div>
        <button
          type="button"
          onClick={triggerRewindConfirm}
          className="rounded-full border border-sky-300 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-900"
        >
          Rewind
        </button>
      </header>

      <SceneHud sceneIndex={sceneIndex === 0 ? 1 : sceneIndex} goodChoices={goodChoices} />

      <section className="rounded-2xl border border-sky-200 bg-white p-4">
        {sceneIndex === 0 && renderIntro()}
        {sceneIndex === 1 && renderSceneOne()}
        {sceneIndex === 2 && renderSceneTwo()}
        {sceneIndex === 3 && renderSceneThree()}
        {sceneIndex === 4 && renderSceneFour()}
        {sceneIndex >= 5 && renderEnding()}
      </section>

      <ConfirmModal
        open={confirmState.open}
        title={confirmState.title}
        message={confirmState.message}
        confirmText={confirmState.confirmText}
        cancelText={confirmState.cancelText}
        variant={confirmState.variant}
        onCancel={() =>
          setConfirmState((previous) => ({
            ...previous,
            open: false,
            pendingAction: null,
          }))
        }
        onConfirm={() => {
          if (confirmState.pendingAction) {
            confirmState.pendingAction();
          }
          setConfirmState((previous) => ({
            ...previous,
            open: false,
            pendingAction: null,
          }));
        }}
      />
    </div>
  );
}


