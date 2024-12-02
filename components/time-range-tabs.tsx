interface TimeRangeTabsProps {
  selectedRange: string;
  onRangeChange: (range: string) => void;
}

export function TimeRangeTabs({ selectedRange, onRangeChange }: TimeRangeTabsProps) {
  const ranges = [
    { id: 'month', label: 'Month' },
    { id: '6months', label: '6 Months' },
    { id: 'allTime', label: 'All Time' },
  ];

  return (
    <div className="flex gap-2 mb-6 bg-black/20 backdrop-blur-sm rounded-lg p-1">
      {ranges.map((range) => (
        <button
          key={range.id}
          onClick={() => onRangeChange(range.id)}
          className={`flex-1 px-4 py-2 text-sm rounded-md transition-colors ${
            selectedRange === range.id
              ? 'bg-black/20 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
} 