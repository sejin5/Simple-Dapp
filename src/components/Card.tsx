interface CardProps {
  title: string;
  children: React.ReactNode;
}

export const Card = ({ title, children }: CardProps) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
      <div className="bg-[#f2f2f6] px-4 py-3">
        <h2 className="text-[20px] font-semibold">{title}</h2>
      </div>
      <div className="p-4 flex flex-col gap-3">{children}</div>
    </div>
  );
};
