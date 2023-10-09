const HtmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode:'development',

    output:{
        clean:true
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
        }
        ]
    },

    optimization:{},

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