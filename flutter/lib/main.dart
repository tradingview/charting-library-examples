import 'package:flutter/material.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

void main() {
  runApp(const ChartingLibraryFlutterApp());
}

class ChartingLibraryFlutterApp extends StatelessWidget {
  const ChartingLibraryFlutterApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: const Text('Charting Library Flutter')),
        body: const LocalHtmlViewer(),
      ),
    );
  }
}

class LocalHtmlViewer extends StatefulWidget {
  const LocalHtmlViewer({super.key});

  @override
  State<LocalHtmlViewer> createState() => _LocalHtmlViewerState();
}

class _LocalHtmlViewerState extends State<LocalHtmlViewer> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return InAppWebView(
      initialFile: 'assets/trading_view/index.html',
      initialSettings: InAppWebViewSettings(
        javaScriptEnabled: true,
        allowFileAccessFromFileURLs: true,
        allowUniversalAccessFromFileURLs: true,
      ),
    );
  }
}
