'use client'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ThemeSwitcherComponent = ({ theme, setTheme, themes }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" style={{ color: "#6366f1", borderColor: "#6366f1" }}>
                <span style={{ position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", borderWidth: "0" }}>
                  Change theme
                </span>
                {(() => {
                  const ThemeIcon = themes[theme].icon;
                  return <ThemeIcon style={{ width: "1.25rem", height: "1.25rem" }} />;
                })()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {Object.entries(themes).map(([key, value]) => (
                <DropdownMenuItem
                  key={key}
                  onClick={() => setTheme(key)}
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer", color: "#6366f1", fontWeight: "bold" }}
                >
                  <value.icon style={{ width: "1rem", height: "1rem" }} />
                  <span>{value.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent>
          <p>Change theme</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ThemeSwitcherComponent;
