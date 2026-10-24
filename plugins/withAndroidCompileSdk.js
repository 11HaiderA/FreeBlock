const { withProjectBuildGradle } = require('@expo/config-plugins');

function withAndroidCompileSdk(config) {
  return withProjectBuildGradle(config, (modConfig) => {
    let contents = modConfig.modResults.contents;

    if (!contents.includes('compileSdkVersion = 36')) {
      contents = contents.replace(
        'buildscript {',
        `buildscript {
  ext {
    buildToolsVersion = "36.0.0"
    minSdkVersion = 24
    compileSdkVersion = 36
    targetSdkVersion = 35
    googleMobileAdsJson = false
  }`
      );
    }

    if (!contents.includes('// Ensure all Android library modules have compileSdk defined for AGP 8+')) {
      contents += `

// Ensure all Android library modules have compileSdk defined for AGP 8+
allprojects {
  plugins.withId("com.android.library") {
    android {
      compileSdk = 36
    }
  }
}
`;
    }

    modConfig.modResults.contents = contents;
    return modConfig;
  });
}

module.exports = withAndroidCompileSdk;
