export default function Layout(props: ILayoutProps) {
    const className = "Layout " + props.className;
    return <div className={className}>{props.children}</div>;
}

interface ILayoutProps {
    children: any;
    className?: string;
}
