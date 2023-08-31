## [0.6.1](https://github.com/youthfulhps/tailwind-converter/compare/v0.6.0...v0.6.1) (2023-08-31)


### Miscellaneous Chores

* Rename parser to leader ([2027838](https://github.com/youthfulhps/tailwind-converter/commit/202783846f94391b495b5b4ae34c84e944297df8))
* Update TestComponent return jsx element cases ([42a55dd](https://github.com/youthfulhps/tailwind-converter/commit/42a55dd2f2559a7d9d675245e18474f1bd8f762c))

## [0.6.0](https://github.com/youthfulhps/tailwind-converter/compare/v0.5.0...v0.6.0) (2023-08-25)


### Features

* Add color property arbitrary key ([9ab1ca7](https://github.com/youthfulhps/tailwind-converter/commit/9ab1ca7edd8b505480cc2f610479ab150fb92898))
* Add dimension property arbitrary key ([189e4f3](https://github.com/youthfulhps/tailwind-converter/commit/189e4f3e2c5ab3fa0f63b25ff1ee3dc3b3b18ef5))
* Add spacing property arbitrary key ([5f7d4a3](https://github.com/youthfulhps/tailwind-converter/commit/5f7d4a3031a39d0e72c72aad35f1fcc3d45e4384))
* Add tailwind class constants ([b5eed8d](https://github.com/youthfulhps/tailwind-converter/commit/b5eed8d1f0ffdfb08f582af530154d36e8110ba8))
* Apply color-related preprocessor ([a0b748d](https://github.com/youthfulhps/tailwind-converter/commit/a0b748d0d99c6b5c7d15418adf760986f8fb0e7b))
* Apply dimension-related preprocessor ([2825fd6](https://github.com/youthfulhps/tailwind-converter/commit/2825fd67796ee31865eea3087e7291f7da5166b4))
* Apply spacing-related preprocessor ([556be05](https://github.com/youthfulhps/tailwind-converter/commit/556be05cc66c167e4863c87f8b668b0023512781))
* Apply text-related preprocessor ([8a5b267](https://github.com/youthfulhps/tailwind-converter/commit/8a5b26717dcabcdd2599944687e7c26616b1b55b))
* Implement initial converter that converts defined style into tailwind classes ([bf5ca2e](https://github.com/youthfulhps/tailwind-converter/commit/bf5ca2e85fa6e8a9ddfdfc46480e8e6ad4714aee))
* Implement text preprocessor to match style value with defined text-related tailwind classes ([5882a9f](https://github.com/youthfulhps/tailwind-converter/commit/5882a9fd945e775d6d468b3749f212c9f8c32540))
* Implement unit preprocessor to match unit of style values ([9b6ee49](https://github.com/youthfulhps/tailwind-converter/commit/9b6ee49662b90117498bde25aa9cc47d3fdb63bf))


### Miscellaneous Chores

* **release:** v0.6.0 [skip ci] ([a77517e](https://github.com/youthfulhps/tailwind-converter/commit/a77517ebaef675a349696fa91d8a9e7b17d5218b))

## [0.5.0](https://github.com/youthfulhps/tailwind-converter/compare/v0.4.0...v0.5.0) (2023-08-21)


### Features

* Add prettier dependency to use parser and printer ([189be7d](https://github.com/youthfulhps/tailwind-converter/commit/189be7d5c94bdbb42688d5373fe610f13918a825))
* Add rollup options to import prettier globally ([07342ea](https://github.com/youthfulhps/tailwind-converter/commit/07342ea016d6a6b564e18f7d0b5cebae1f416bfb))
* Add test component file for development testing ([e862969](https://github.com/youthfulhps/tailwind-converter/commit/e862969d0a323d7578a27798f3c5730cd1d9dcae))
* Implement extractor to extract required ast from preprocessed results of prettier parser ([2b51993](https://github.com/youthfulhps/tailwind-converter/commit/2b519935918419a016cc8a5b66de875e276076fe))
* Implement incomplete main script ([7470209](https://github.com/youthfulhps/tailwind-converter/commit/747020946ed9fac72e0cb7335aa4fa13bd0bc60a))
* Implement printer to return results of customized prettier ([3c4e876](https://github.com/youthfulhps/tailwind-converter/commit/3c4e876d4e9e23127f95a7062b3a16af419af4aa))


### Miscellaneous Chores

* **release:** v0.5.0 [skip ci] ([2452055](https://github.com/youthfulhps/tailwind-converter/commit/24520559c4d074a93fce37166740a5595afd2e6a))
* Rename test component file ([00ff1b0](https://github.com/youthfulhps/tailwind-converter/commit/00ff1b0e2c1219b3d3439950838394ed2b444bdf))

## [0.4.0](https://github.com/youthfulhps/tailwind-converter/compare/v0.3.0...v0.4.0) (2023-07-27)


### Features

* Add convert bin script ([a69a717](https://github.com/youthfulhps/tailwind-converter/commit/a69a7174dedc1e09f9c9df9da549b3c250cfe834))
* Add csstype dependency for style property type checking ([aab2d81](https://github.com/youthfulhps/tailwind-converter/commit/aab2d81f9977dfc29634f9deb4a860f677226b28))
* Add dev script ([a21ff60](https://github.com/youthfulhps/tailwind-converter/commit/a21ff60183d4466e81b7d53056f64b1cb5249a00))
* Apply scrapRawScript to main execution function ([b07ae94](https://github.com/youthfulhps/tailwind-converter/commit/b07ae943a621dcd5dec55bb9f6b22fa4f3ce5347))
* Implement function to scrap file raw script ([e804b26](https://github.com/youthfulhps/tailwind-converter/commit/e804b269c5c16568f40942792cc35232d2956fbb))


### Miscellaneous Chores

* Add project keyword metadata ([35a8e13](https://github.com/youthfulhps/tailwind-converter/commit/35a8e136a8a5b0fe484e56f8b90476a439fb72c9))
* Delete unnecessary scraper test files ([1a79b32](https://github.com/youthfulhps/tailwind-converter/commit/1a79b32af33c984631e6a5102e1f20cb11164cf0))
* **release:** v0.4.0 [skip ci] ([6892c33](https://github.com/youthfulhps/tailwind-converter/commit/6892c33576bbb4f37464348af02224b60bdf6ef3))

## [0.3.0](https://github.com/youthfulhps/tailwind-converter/compare/v0.2.3...v0.3.0) (2023-07-10)


### Features

* Add rollup plugin polyfill node dependency ([bd33eef](https://github.com/youthfulhps/tailwind-converter/commit/bd33eefc4bfe4a4d0754445507d5b83940a5aab4))
* Apply rollup plugin polyfill node dependency ([5923d57](https://github.com/youthfulhps/tailwind-converter/commit/5923d573ccbbdbb9d1445c26ab9c15b1813954c4))


### Miscellaneous Chores

* **release:** v0.3.0 [skip ci] ([9485710](https://github.com/youthfulhps/tailwind-converter/commit/948571021c0bfcec1e04edc201d21eaf89621c5d))

