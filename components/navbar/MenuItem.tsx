'use client';

interface MenuItemProps {
  onClick: () => void;
  label: string;
  id?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ id, onClick, label }) => {
  return (
    <div
      onClick={onClick}
      id={id}
      className="px-4 py-3 hover:bg-neutral-100 transitionfont-semibold "
    >
      {label}
    </div>
  );
};

export default MenuItem;
