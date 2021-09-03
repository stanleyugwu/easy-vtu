var getBlacklistRE = function getBlacklistRE(){
	return new RegExp("(.*\\android\\.*|\.git|.*\\__fixtures__\\.*|node_modules[\\\\]react[\\\\]dist[\\\\].*|website\\node_modules\\.*|heapCapture\\bundle\.js|.*\\__tests__\\.*)$");
}

module.exports = {
	resolver: {
		"blacklistRE": getBlacklistRE(),
	}
};