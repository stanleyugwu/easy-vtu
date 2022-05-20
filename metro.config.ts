var getBlacklistRE = function getBlacklistRE(){
	return new RegExp("(.*\\android\\.*|\.git|.*\\__fixtures__\\.*|node_modules[\\\\]react[\\\\]dist[\\\\].*|website\\node_modules\\.*|heapCapture\\bundle\.js|.*\\__tests__\\.*|.*\\tests\\.*)$");
}

// Learn more https://docs.expo.io/guides/customizing-metro
const {getDefaultConfig} = require('expo/metro-config');

module.exports = (() => { 
    const {  
        resolver: { 
            sourceExts, 
            assetExts 
        }  
    } = getDefaultConfig(__dirname); 

    return {
        transformer: {      
            babelTransformerPath: require.resolve("react-native-svg-transformer")    
        },    
        resolver: {
			"blacklistRE": getBlacklistRE(),
            assetExts: assetExts.filter((ext:any) => ext !== "svg"),
            sourceExts: [...sourceExts, "svg"]    
        }};
})();