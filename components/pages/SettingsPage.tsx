import AtlasMemorySettings from "@/components/settings/AtlasMemorySettings";
import SettingsScreen from "@/components/settings/SettingsScreen";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <SettingsScreen />
      <AtlasMemorySettings />
    </div>
  );
}