export function Logo({ className = "", ...props }: React.ComponentProps<"svg">) {
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        {...props}
      >
        <path
          d="M125 100L250 175L375 100L500 175V325L375 400L250 325L125 400L0 325V175L125 100Z"
          className="fill-current"
        />
      </svg>
    );
  }