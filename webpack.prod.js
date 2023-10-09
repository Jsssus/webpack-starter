const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require('terser-webpack-plugin');

module.exports = {
    mode:'production',

    output:{
        clean:true,
        filename:'main.[contenthash].js'
    },

    module:{
        rules:[
        {
            test:/\.html$/, //busca todos los html en nuestras carpetas
            loader:'html-loader', //activa el loader
            options:{
                sources: false
            }
        },
        {
            test:/\.css$/, //busca todos los css
            exclude: /styles.css$/, //esto sirve para que excluya los test de abajo(1)
            use:['style-loader','css-loader'], //activa los loader para que se pueda ver
        },
        {
            test:/styles.css$/, //(1)
            use:[MiniCssExtract.loader,'css-loader']
        },
        {
            test:/\.(png|jpe?g|gif)$/,
            loader:'file-loader'
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                presets: ['@babel/preset-env']
                }
            }
            }
        ]
    },

    optimization:{
        minimize: true,
        minimizer:[
            new CssMinimizer(),
            new Terser(),
        ]
    },

    plugins:[
        new HtmlWebPack({
            title:'Mi Wepack App',
            //filename:'index.html'
            template:'./src/index.html'
        }),

        new MiniCssExtract({
            filename: '[name].[fullhash].css', //[fullhash] nos permite que el navegador no guarde los estilos en cache
            ignoreOrder: false,
        }),

        new CopyPlugin({//permite crear una carpeta con assets en el dist, sive para varios tipos de archivos
            patterns: [
                { from: 'src/assets/', to: 'assets/'}
            ]
        }),
    ]
}