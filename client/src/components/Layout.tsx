export default function Layout(props: ILayoutProps) {
    return <div className="Layout">{props.children}</div>;
}

interface ILayoutProps {
    children: any;
}
