import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

interface TargetCountriesProps {
  formData: { targetCountries: string[] };
  updateFormData: (field: string, value: any) => void;
}

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)", "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini (fmr. Swaziland)", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe", "Remote"
];

export function TargetCountries({ formData, updateFormData }: TargetCountriesProps) {
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Filter countries by search
  const filteredCountries = countries.filter(c =>
    c.toLowerCase().includes(search.toLowerCase()) &&
    !formData.targetCountries.includes(c)
  );

  const handleSelect = (country: string) => {
    if (!formData.targetCountries.includes(country)) {
      updateFormData("targetCountries", [...formData.targetCountries, country]);
    }
    setSearch("");
  };

  const handleRemove = (country: string) => {
    updateFormData(
      "targetCountries",
      formData.targetCountries.filter(c => c !== country)
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">Which countries would you like to target?</h3>
        <p className="text-muted-foreground">
          Select multiple countries. Start typing to search and add.
        </p>
      </div>
      <div className="w-full max-w-xl mx-auto">
        <div className="mb-2 flex flex-wrap gap-2 min-h-[44px] items-center border rounded-md px-3 py-2 bg-background">
          {formData.targetCountries.map((country) => (
            <span
              key={country}
              className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded text-sm"
            >
              {country}
              <button
                type="button"
                className="ml-1 text-primary hover:text-destructive"
                onClick={() => handleRemove(country)}
                aria-label={`Remove ${country}`}
              >
                ×
              </button>
            </span>
          ))}
          <Input
            className="flex-1 min-w-[120px] border-0 shadow-none focus:ring-0 focus-visible:ring-0 bg-transparent text-base"
            placeholder="Type to search countries..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onFocus={() => setDropdownOpen(true)}
            onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
            autoComplete="off"
          />
        </div>
        {dropdownOpen && filteredCountries.length > 0 && (
          <div className="absolute z-10 w-full max-w-xl bg-background border rounded-md shadow-lg mt-1 max-h-60 overflow-auto">
            {filteredCountries.map((country) => (
              <div
                key={country}
                className="px-4 py-2 cursor-pointer hover:bg-primary/10"
                onMouseDown={() => handleSelect(country)}
              >
                {country}
              </div>
            ))}
          </div>
        )}
      </div>
      {formData.targetCountries.length > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Selected: {formData.targetCountries.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
} 