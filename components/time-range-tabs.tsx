interface TimeRangeTabsProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

export function TimeRangeTabs({ selectedRange, onRangeChange }: TimeRangeTabsProps) {
  const ranges = [
    { id: 'short_term', label: 'Last 4\nWeeks' },
    { id: 'medium_term', label: 'Last 6\nMonths' },
    { id: 'long_term', label: 'All\nTime' },
  ];

  return (
    <div className="flex w-full max-w-[400px] gap-2 mb-6">
      {ranges.map((range) => (
        <button
          key={range.id}
          onClick={() => onRangeChange(range.id)}
          className={`flex-1 h-[52px] min-w-[120px] px-4 flex items-center justify-center text-sm rounded-md whitespace-pre-line leading-tight transition-colors ${
            selectedRange === range.id
              ? 'bg-green-500 text-white'
              : 'bg-black/40 text-gray-400 hover:text-white'
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
} 