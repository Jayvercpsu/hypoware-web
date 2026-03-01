export default function PrivacyPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold text-sky-950">Privacy Policy</h1>
      <div className="rounded-2xl border border-sky-200 bg-white p-4 text-sm text-sky-900">
        <p>
          HypoWare stores your data only in your browser using LocalStorage. No account system and no
          backend database are used in this app.
        </p>
        <p className="mt-2">
          You can reset all data at any time using the Settings panel. Imported and exported files are
          managed entirely on your device.
        </p>
      </div>
    </div>
  );
}
