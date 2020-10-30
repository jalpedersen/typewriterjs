const path = require("path");

module.exports = {
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            insert: function insertAtTop(element) {
                                var parent = document.querySelector('head');
                                var lastInsertedElement =
                                    window._lastElementInsertedByStyleLoader;

                                if (!lastInsertedElement) {
                                    parent.insertBefore(element, parent.firstChild);
                                } else if (lastInsertedElement.nextSibling) {
                                    parent.insertBefore(element, lastInsertedElement.nextSibling);
                                } else {
                                    parent.appendChild(element);
                                }

                                window._lastElementInsertedByStyleLoader = element;
                            },
                        },
                    },
                    'css-loader',
                ],
            },
        ],
    },
    resolve: {
        extensions: [ ".tsx", ".ts", ".js", ".css" ],
    },
    output: {
        filename: "typewriter.js",
        path: path.resolve(__dirname, "dist"),
    },
};
