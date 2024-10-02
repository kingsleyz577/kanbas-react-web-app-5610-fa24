import "./index.css";

export default function Lab2() {
    return (
        <div id="wd-lab2">
            <h2>Lab 2 - Cascading Style Sheets</h2>
            <h3>Styling with the STYLE attribute</h3>
            <p>
                The style attribute allows configuring the look and feel
                right on the element. Although it's very convenient,
                it is considered bad practice and you should avoid
                using the style attribute.
            </p>
            <p>
                Instead of using IDs to refer to elements, you can use an element's CLASS attribute.
            </p>
            <div id="wd-css-colors">
                <h2>Colors</h2>
                <h3 className="wd-fg-color-blue">Foreground color</h3>
                <p className="wd-fg-color-red">
                    The text in this paragraph is red but
                    <span className="wd-fg-color-green"> this text is green</span>.
                </p>
            </div>

            <div id="wd-css-background-colors">
                <h3 className="wd-bg-color-blue wd-fg-color-white">Background color</h3>
                <p className="wd-bg-color-red wd-fg-color-black">
                    This background of this paragraph is red but
                    <span className="wd-bg-color-green wd-fg-color-white">
                        the background of this text is green and the foreground is white.
                    </span>
                </p>
            </div>

            <h1 style={{ backgroundColor: "yellow" }}>Block vs inline elements</h1>
            <p style={{ backgroundColor: "blue", color: "white" }}>
                Headings ... width
            </p>
            <p>
                Normal text renders inline.
                <br /><br />
                <span style={{ backgroundColor: "red", color: "white" }}>Span elements</span>
                <span style={{ backgroundColor: "red", color: "white" }}> render inline</span>
                with the rest of the content.
            </p>
        </div>
    );
}
