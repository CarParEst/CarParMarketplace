import { useState } from 'react';
import { Car, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { carMakes, carModelsByMake } from '../data/mockData';

interface CarFilterProps {
  onFilterChange: (filter: CarFilter | null) => void;
}

export interface CarFilter {
  make: string;
  model?: string;
  year?: number;
}

export function CarFilter({ onFilterChange }: CarFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [activeFilter, setActiveFilter] = useState<CarFilter | null>(null);

  const currentYear = 2026;
  const years = Array.from({ length: 35 }, (_, i) => currentYear - i);

  const handleApplyFilter = () => {
    if (selectedMake) {
      const filter: CarFilter = {
        make: selectedMake,
        model: selectedModel || undefined,
        year: selectedYear ? parseInt(selectedYear) : undefined,
      };
      setActiveFilter(filter);
      onFilterChange(filter);
      setIsOpen(false);
    }
  };

  const handleClearFilter = () => {
    setSelectedMake('');
    setSelectedModel('');
    setSelectedYear('');
    setActiveFilter(null);
    onFilterChange(null);
    setIsOpen(false);
  };

  const handleMakeChange = (make: string) => {
    setSelectedMake(make);
    setSelectedModel(''); // Reset model when make changes
  };

  return (
    <div className="relative">
      {/* Filter Button */}
      <div className="flex items-center gap-2">
        <Button
          variant={activeFilter ? 'default' : 'outline'}
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className={`whitespace-nowrap ${
            activeFilter 
              ? 'bg-[#0ABAB5] hover:bg-[#0ABAB5]/90' 
              : 'border-[#0ABAB5] hover:bg-[#0ABAB5]/10'
          }`}
        >
          <Car className="size-4 mr-2" />
          {activeFilter
            ? `${activeFilter.make}${activeFilter.model ? ' ' + activeFilter.model : ''}${activeFilter.year ? ' ' + activeFilter.year : ''}`
            : 'Otsi oma auto järgi'}
        </Button>
        
        {/* Clear Filter Button */}
        {activeFilter && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilter}
            className="size-8 p-0"
            title="Eemalda filter"
          >
            <X className="size-4" />
          </Button>
        )}
      </div>

      {/* Filter Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Filter Card */}
          <Card className="absolute top-12 left-0 z-50 p-4 w-80 shadow-lg border-[#0ABAB5]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Otsi oma auto järgi</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="size-8 p-0"
              >
                <X className="size-4" />
              </Button>
            </div>

            <div className="space-y-3">
              {/* Make Selection */}
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  Mark
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg bg-card text-sm"
                  value={selectedMake}
                  onChange={(e) => handleMakeChange(e.target.value)}
                >
                  <option value="">Vali mark</option>
                  {carMakes.map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </select>
              </div>

              {/* Model Selection */}
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  Mudel
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg bg-card text-sm disabled:opacity-50"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={!selectedMake}
                >
                  <option value="">Vali mudel</option>
                  {selectedMake &&
                    carModelsByMake[selectedMake]?.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                </select>
              </div>

              {/* Year Selection */}
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">
                  Aasta
                </label>
                <select
                  className="w-full px-3 py-2 border rounded-lg bg-card text-sm"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="">Vali aasta</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearFilter}
                  className="flex-1"
                >
                  Tühista
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleApplyFilter}
                  disabled={!selectedMake}
                  className="flex-1"
                >
                  Otsi
                </Button>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}