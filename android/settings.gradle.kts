pluginManagement {
    repositories {
        gradlePluginPortal()
        google()
        mavenCentral()
        mavenLocal()
    }
}

dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        mavenLocal()
    }
    versionCatalogs {
        create("libs") {
            from(files("libs.versions.toml"))
        }
    }
}

buildCache {
    local {
        isPush = true
        directory = File(rootDir, ".gradle/build-cache")
    }
}

rootProject.name = "ChartingLibraryExample"

include(
    ":app",
)
