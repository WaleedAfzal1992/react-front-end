import "./styles.css";
type Props = {
    height?: number;
    width?: number;
};
export default function Loader(props: Props) {
    return (
        <div
            className="app-loader"
            style={{
                height: props.height || 20,
                width: props.width || 50,
            }}
        ></div>
    );
}
