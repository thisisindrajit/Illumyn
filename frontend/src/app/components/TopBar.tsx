import { APP_NAME } from "../../../constants/common";

const TopBar = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="text-sm uppercase tracking-widest border border-foreground/25 px-4 py-2 animate-fade-in">{APP_NAME}</div>
      <button className="px-4 py-2 border border-primary hover:text-background hover:bg-primary transition-colors text-sm animate-fade-in">
        Login
      </button>
    </div>
  );
};

export default TopBar;
