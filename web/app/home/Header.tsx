type HeaderProps = {
  title: string;
};

export default function Header(props: HeaderProps) {
  return (
    <div className="flex w-4/5">
      <p className="font-Inter text-center text-4xl  tracking-[.6em]">{props.title}</p>
    </div>
  );
}
