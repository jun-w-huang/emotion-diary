import styled from "styled-components";

interface ViewModeToggleProps {
  viewMode: "month" | "week";
  setViewMode: React.Dispatch<React.SetStateAction<"month" | "week">>;
}

const ToggleLabel = styled.label<{
  checked: boolean;
}>`
  position: absolute;
  top: 0;
  left: ${(props) => (props.htmlFor === 'week' ? "0" : "")};
  right: ${(props) => (props.htmlFor === 'month' ? "0" : "")};
  bottom: 0;
  background-color: ${(props) => (props.checked ? "#ffffff" : "")};
  color: ${(props) => (props.checked ? "#8693B6" : "#ffffff")};
  display:flex;
  align-items: center;
  cursor: pointer;
  border-radius: 1.5rem;
  padding: 0.75rem 1.8rem 0.75rem 1.8rem;
  margin: 0.25rem;
`;

export const ViewModeToggle = (props: ViewModeToggleProps) => {
  return (
    <div className="relative flex h-12 w-48 items-center rounded-3xl bg-emotionLightBlue py-2">
      <div className="w-1/2 py-1">
        <input
          type="radio"
          id="week"
          name="viewMode"
          value="week"
          checked={props.viewMode === "week"}
          onClick={() => props.setViewMode("week")}
          className="hidden"
        />
        <ToggleLabel htmlFor="week" checked={props.viewMode === "week"}>
          Week
        </ToggleLabel>
      </div>
      <div className="w-1/2 py-1">
        <input
          type="radio"
          id="month"
          name="viewMode"
          value="month"
          checked={props.viewMode === "month"}
          onClick={() => props.setViewMode("month")}
          className="hidden"
        />
        <ToggleLabel htmlFor="month" checked={props.viewMode === "month"}>
          Month
        </ToggleLabel>
      </div>
    </div>
  );
};
