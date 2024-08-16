interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  active?: boolean;
}

export default function Button({ text, active = false, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      class={`${
        active ? "text-[#a8c3e7]" : "text-[#4b5b6a]"
      } hover:text-[#a8c3e7] text-left  font-bankGothic text-3xl font-medium`}
    >
      {text}
    </button>
  );
}
