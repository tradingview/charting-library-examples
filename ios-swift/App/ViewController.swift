//
//  ViewController.swift
//  iOS
//
//  Created by TradingView on 04.10.2018.
//  Copyright © 2018 Example Inc. All rights reserved.
//

import UIKit
import WebKit

class ViewController: UIViewController {
    
    override func viewDidAppear(_ animated: Bool) {
        super.viewDidAppear(animated)
        
        let frame = UIScreen.main.bounds;
        
        let configuration = WKWebViewConfiguration()
        configuration.preferences.setValue(true, forKey: "allowFileAccessFromFileURLs")
        
        let urlRaw = Bundle.main.url(forResource: "index", withExtension: "html")
        
        let webView = WKWebView(frame: frame, configuration: configuration)
        guard let url = urlRaw else {
            print("No file at url")
            return
        }
        webView.loadFileURL(url, allowingReadAccessTo: url)
        
        view.addSubview(webView)
    }
    
    
}

