import { useState } from 'react';
import { X, User, CreditCard, Palette, Globe, Shield, Save } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
  userData: {
    name: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
  };
}

export function SettingsDialog({ open, onClose, userData }: SettingsDialogProps) {
  const [activeSection, setActiveSection] = useState('appearance');
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { user } = useAuth();

  // Profile form state
  const [profileData, setProfileData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    location: userData.location,
    bio: userData.bio,
  });

  // Bank information state
  const [bankData, setBankData] = useState({
    accountHolder: '',
    iban: '',
    bankName: '',
    swiftCode: '',
  });

  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    showEmail: false,
    showPhone: false,
    showLocation: true,
    showLastSeen: true,
    showStatistics: true,
  });

  // Theme preference state
  const [themePreference, setThemePreference] = useState<'light' | 'dark' | 'system'>(
    theme === 'dark' ? 'dark' : theme === 'light' ? 'light' : 'system'
  );

  const handleSaveProfile = () => {
    // In real app, save to backend
    toast.success(language === 'et' ? 'Profiili andmed salvestatud!' : 'Profile data saved!');
  };

  const handleSaveBankInfo = () => {
    // In real app, save to backend
    toast.success(language === 'et' ? 'Pangaandmed salvestatud!' : 'Bank information saved!');
  };

  const handleSavePrivacy = () => {
    // In real app, save to backend
    toast.success(language === 'et' ? 'Privaatsusseaded salvestatud!' : 'Privacy settings saved!');
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setThemePreference(newTheme);
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
    } else {
      setTheme(newTheme);
    }
    toast.success(language === 'et' ? 'Teema muudetud!' : 'Theme changed!');
  };

  if (!open) return null;

  const allSections = [
    {
      id: 'profile',
      label: language === 'et' ? 'Profiil' : 'Profile',
      icon: User,
      requiresAuth: true,
    },
    {
      id: 'bank',
      label: language === 'et' ? 'Pangaandmed' : 'Bank Information',
      icon: CreditCard,
      requiresAuth: true,
    },
    {
      id: 'appearance',
      label: language === 'et' ? 'Välimus' : 'Appearance',
      icon: Palette,
      requiresAuth: false,
    },
    {
      id: 'language',
      label: language === 'et' ? 'Keel' : 'Language',
      icon: Globe,
      requiresAuth: false,
    },
    {
      id: 'privacy',
      label: language === 'et' ? 'Privaatsus' : 'Privacy',
      icon: Shield,
      requiresAuth: true,
    },
  ];

  // Filter sections based on auth state
  const sections = user
    ? allSections
    : allSections.filter(section => !section.requiresAuth);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">
            {language === 'et' ? 'Seaded' : 'Settings'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 border-r p-4 overflow-y-auto">
            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#0ABAB5] text-white'
                        : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    <Icon className="size-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Profile Section */}
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    {language === 'et' ? 'Profiili andmed' : 'Profile Information'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {language === 'et'
                      ? 'Halda oma isiklikku informatsiooni'
                      : 'Manage your personal information'}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === 'et' ? 'Nimi' : 'Name'}
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) =>
                        setProfileData({ ...profileData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border bg-background"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === 'et' ? 'E-post' : 'Email'}
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) =>
                        setProfileData({ ...profileData, email: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border bg-background"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === 'et' ? 'Telefon' : 'Phone'}
                    </label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({ ...profileData, phone: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border bg-background"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === 'et' ? 'Asukoht' : 'Location'}
                    </label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) =>
                        setProfileData({ ...profileData, location: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg border bg-background"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === 'et' ? 'Bio' : 'Bio'}
                    </label>
                    <textarea
                      value={profileData.bio}
                      onChange={(e) =>
                        setProfileData({ ...profileData, bio: e.target.value })
                      }
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border bg-background resize-none"
                    />
                  </div>

                  <Button
                    onClick={handleSaveProfile}
                    className="bg-[#0ABAB5] hover:bg-[#0ABAB5]/90"
                  >
                    <Save className="size-4 mr-2" />
                    {language === 'et' ? 'Salvesta muudatused' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            )}

            {/* Bank Information Section */}
            {activeSection === 'bank' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    {language === 'et' ? 'Pangaandmed' : 'Bank Information'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {language === 'et'
                      ? 'Lisa oma pangakonto, et saada väljamakseid müükide eest'
                      : 'Add your bank account to receive payouts from sales'}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === 'et' ? 'Konto omanik' : 'Account Holder'}
                    </label>
                    <input
                      type="text"
                      value={bankData.accountHolder}
                      onChange={(e) =>
                        setBankData({ ...bankData, accountHolder: e.target.value })
                      }
                      placeholder={language === 'et' ? 'Ees- ja perekonnanimi' : 'Full name'}
                      className="w-full px-4 py-2 rounded-lg border bg-background"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">IBAN</label>
                    <input
                      type="text"
                      value={bankData.iban}
                      onChange={(e) =>
                        setBankData({ ...bankData, iban: e.target.value })
                      }
                      placeholder="EE38 2200 2210 2014 5685"
                      className="w-full px-4 py-2 rounded-lg border bg-background"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {language === 'et' ? 'Panga nimi' : 'Bank Name'}
                    </label>
                    <input
                      type="text"
                      value={bankData.bankName}
                      onChange={(e) =>
                        setBankData({ ...bankData, bankName: e.target.value })
                      }
                      placeholder={language === 'et' ? 'nt. Swedbank' : 'e.g., Swedbank'}
                      className="w-full px-4 py-2 rounded-lg border bg-background"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      SWIFT/BIC {language === 'et' ? '(valikuline)' : '(optional)'}
                    </label>
                    <input
                      type="text"
                      value={bankData.swiftCode}
                      onChange={(e) =>
                        setBankData({ ...bankData, swiftCode: e.target.value })
                      }
                      placeholder="HABAEE2X"
                      className="w-full px-4 py-2 rounded-lg border bg-background"
                    />
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <p className="text-sm text-blue-900 dark:text-blue-100">
                      <strong>
                        {language === 'et' ? 'Turvalisus:' : 'Security:'}
                      </strong>{' '}
                      {language === 'et'
                        ? 'Sinu pangaandmed on krüpteeritud ja turvaliselt salvestatud. Neid kasutatakse ainult maksete töötlemiseks.'
                        : 'Your bank information is encrypted and securely stored. It will only be used for processing payments.'}
                    </p>
                  </div>

                  <Button
                    onClick={handleSaveBankInfo}
                    className="bg-[#0ABAB5] hover:bg-[#0ABAB5]/90"
                  >
                    <Save className="size-4 mr-2" />
                    {language === 'et' ? 'Salvesta pangaandmed' : 'Save Bank Information'}
                  </Button>
                </div>
              </div>
            )}

            {/* Appearance Section */}
            {activeSection === 'appearance' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    {language === 'et' ? 'Välimus' : 'Appearance'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {language === 'et'
                      ? 'Kohanda rakenduse välimust'
                      : 'Customize the appearance of the application'}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      {language === 'et' ? 'Teema' : 'Theme'}
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        onClick={() => handleThemeChange('light')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          themePreference === 'light'
                            ? 'border-[#0ABAB5] bg-[#0ABAB5]/10'
                            : 'border-border hover:border-[#0ABAB5]/50'
                        }`}
                      >
                        <div className="bg-white border rounded-lg p-3 mb-2">
                          <div className="space-y-2">
                            <div className="h-2 bg-gray-200 rounded"></div>
                            <div className="h-2 bg-gray-300 rounded w-2/3"></div>
                          </div>
                        </div>
                        <p className="text-sm font-medium">
                          {language === 'et' ? 'Hele' : 'Light'}
                        </p>
                      </button>

                      <button
                        onClick={() => handleThemeChange('dark')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          themePreference === 'dark'
                            ? 'border-[#0ABAB5] bg-[#0ABAB5]/10'
                            : 'border-border hover:border-[#0ABAB5]/50'
                        }`}
                      >
                        <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 mb-2">
                          <div className="space-y-2">
                            <div className="h-2 bg-gray-700 rounded"></div>
                            <div className="h-2 bg-gray-600 rounded w-2/3"></div>
                          </div>
                        </div>
                        <p className="text-sm font-medium">
                          {language === 'et' ? 'Tume' : 'Dark'}
                        </p>
                      </button>

                      <button
                        onClick={() => handleThemeChange('system')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          themePreference === 'system'
                            ? 'border-[#0ABAB5] bg-[#0ABAB5]/10'
                            : 'border-border hover:border-[#0ABAB5]/50'
                        }`}
                      >
                        <div className="relative h-[52px] mb-2">
                          <div className="absolute left-0 top-0 w-1/2 bg-white border rounded-l-lg p-2">
                            <div className="space-y-1">
                              <div className="h-1 bg-gray-200 rounded"></div>
                              <div className="h-1 bg-gray-300 rounded w-2/3"></div>
                            </div>
                          </div>
                          <div className="absolute right-0 top-0 w-1/2 bg-gray-900 border border-gray-700 rounded-r-lg p-2">
                            <div className="space-y-1">
                              <div className="h-1 bg-gray-700 rounded"></div>
                              <div className="h-1 bg-gray-600 rounded w-2/3"></div>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm font-medium">
                          {language === 'et' ? 'Süsteem' : 'System'}
                        </p>
                      </button>
                    </div>
                  </div>

                  <div className="bg-muted rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      {language === 'et'
                        ? 'Süsteemi teema kasutab sinu seadme eelistusi.'
                        : 'System theme uses your device preferences.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Language Section */}
            {activeSection === 'language' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    {language === 'et' ? 'Keel' : 'Language'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {language === 'et'
                      ? 'Vali oma eelistatud keel'
                      : 'Choose your preferred language'}
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setLanguage('et');
                      toast.success('Keel muudetud eesti keeleks!');
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                      language === 'et'
                        ? 'border-[#0ABAB5] bg-[#0ABAB5]/10'
                        : 'border-border hover:border-[#0ABAB5]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🇪🇪</div>
                      <div className="text-left">
                        <p className="font-semibold">Eesti keel</p>
                        <p className="text-sm text-muted-foreground">Estonian</p>
                      </div>
                    </div>
                    {language === 'et' && (
                      <div className="size-5 rounded-full bg-[#0ABAB5] flex items-center justify-center">
                        <div className="size-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setLanguage('en');
                      toast.success('Language changed to English!');
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                      language === 'en'
                        ? 'border-[#0ABAB5] bg-[#0ABAB5]/10'
                        : 'border-border hover:border-[#0ABAB5]/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🇬🇧</div>
                      <div className="text-left">
                        <p className="font-semibold">English</p>
                        <p className="text-sm text-muted-foreground">Inglise keel</p>
                      </div>
                    </div>
                    {language === 'en' && (
                      <div className="size-5 rounded-full bg-[#0ABAB5] flex items-center justify-center">
                        <div className="size-2 rounded-full bg-white"></div>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Privacy Section */}
            {activeSection === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">
                    {language === 'et' ? 'Privaatsus ja andmed' : 'Privacy & Data'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {language === 'et'
                      ? 'Kontrolli, milliseid andmeid teistele näidatakse'
                      : 'Control what information is shown to others'}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">
                        {language === 'et' ? 'Näita e-posti aadressi' : 'Show email address'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {language === 'et'
                          ? 'Teised kasutajad näevad sinu e-posti aadressi'
                          : 'Other users can see your email address'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacySettings.showEmail}
                        onChange={(e) =>
                          setPrivacySettings({
                            ...privacySettings,
                            showEmail: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0ABAB5]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0ABAB5]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">
                        {language === 'et' ? 'Näita telefoninumbrit' : 'Show phone number'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {language === 'et'
                          ? 'Teised kasutajad näevad sinu telefoninumbrit'
                          : 'Other users can see your phone number'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacySettings.showPhone}
                        onChange={(e) =>
                          setPrivacySettings({
                            ...privacySettings,
                            showPhone: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0ABAB5]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0ABAB5]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">
                        {language === 'et' ? 'Näita asukohta' : 'Show location'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {language === 'et'
                          ? 'Teised kasutajad näevad sinu linna/piirkonda'
                          : 'Other users can see your city/region'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacySettings.showLocation}
                        onChange={(e) =>
                          setPrivacySettings({
                            ...privacySettings,
                            showLocation: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0ABAB5]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0ABAB5]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">
                        {language === 'et' ? 'Näita viimast aktiivsust' : 'Show last activity'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {language === 'et'
                          ? 'Teised näevad, millal sa viimati aktiivne olid'
                          : 'Others can see when you were last active'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacySettings.showLastSeen}
                        onChange={(e) =>
                          setPrivacySettings({
                            ...privacySettings,
                            showLastSeen: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0ABAB5]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0ABAB5]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">
                        {language === 'et' ? 'Näita statistikat' : 'Show statistics'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {language === 'et'
                          ? 'Teised näevad sinu müügistatistikat ja hinnanguid'
                          : 'Others can see your sales statistics and ratings'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacySettings.showStatistics}
                        onChange={(e) =>
                          setPrivacySettings({
                            ...privacySettings,
                            showStatistics: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0ABAB5]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#0ABAB5]"></div>
                    </label>
                  </div>

                  <Button
                    onClick={handleSavePrivacy}
                    className="bg-[#0ABAB5] hover:bg-[#0ABAB5]/90"
                  >
                    <Save className="size-4 mr-2" />
                    {language === 'et' ? 'Salvesta seaded' : 'Save Settings'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}