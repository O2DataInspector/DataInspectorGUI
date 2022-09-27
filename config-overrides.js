module.exports = function override(config) { 
		const fallback = config.resolve.fallback || {}; 
		Object.assign(fallback, { 
            "fs": false,
            "child_process" : false,
            "net" : false,
            "tls" : false,
            "zlib" : require.resolve("browserify-zlib"),
            "path" : require.resolve("path-browserify"),
            "crypto" : require.resolve("crypto-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "assert": require.resolve("assert/"),
            "util": require.resolve("util/"),
            "http": require.resolve("stream-http"),
            "stream": require.resolve("stream-browserify"),
            "url": require.resolve("url/"),
            "https": require.resolve("https-browserify")
      }) 
   config.resolve.fallback = fallback;  
   return config; }