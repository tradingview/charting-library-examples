plugins {
    alias(libs.plugins.android)
    alias(libs.plugins.kotlin.android)
}

android {
    namespace = "com.tradingview.android"
    compileSdk = libs.versions.sdk.compile.get().toInt()
    defaultConfig {
        applicationId = "com.tradingview.android"
        minSdk = libs.versions.sdk.min.get().toInt()
        targetSdk = libs.versions.sdk.compile.get().toInt()
        versionCode = 1
        versionName = "1.0"
    }
    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "consumer-rules.pro")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
    buildFeatures {
        viewBinding = true
    }
}

dependencies {
    implementation(libs.androidx.appcompat)
    implementation(libs.androidx.constraintlayout)
}
