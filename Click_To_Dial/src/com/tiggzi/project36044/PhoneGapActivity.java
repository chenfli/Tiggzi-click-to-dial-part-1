package com.tiggzi.project36044;

import java.io.BufferedReader;
import java.io.DataInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;

import android.content.Context;
import android.content.res.Configuration;
import android.os.Bundle;
import android.util.Log;
import android.view.Display;
import android.view.WindowManager;
import android.webkit.WebSettings;



public class PhoneGapActivity extends org.apache.cordova.DroidGap {

	private static final String WORK_DIR = "file:///android_asset/www/";

	protected float ORIG_APP_W = 320;
	protected float ORIG_APP_H = 480;

	/**
	 * Called when the activity is first created.
	 * 
	 * @param savedInstanceState
	 *            If the activity is being re-initialized after previously being
	 *            shut down then this Bundle contains the data it most recently
	 *            supplied in onSaveInstanceState(Bundle). <b>Note: Otherwise it
	 *            is null.</b>
	 */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);

		super.loadUrl(WORK_DIR + getStartFileName());

		super.appView.setVerticalScrollBarEnabled(false);
		super.appView.setHorizontalScrollBarEnabled(false);
		this.appView.clearCache(false);
		this.appView.clearHistory();		
		// set some defaults
		this.appView.setBackgroundColor(0x000000);
		this.appView.setHorizontalScrollBarEnabled(false);
		this.appView.setHorizontalScrollbarOverlay(false);
		this.appView.setVerticalScrollBarEnabled(false);
		this.appView.setVerticalScrollbarOverlay(false);
		
		/*
		 * Strings up to the end of the function are taken from the internet (it's zoom snippet, created to solve 
		 * problem with different screens density). Presumably they are taken from this stackoverflow topic
		 * http://stackoverflow.com/questions/9663149/noob-phonegap-how-do-you-keep-the-same-resolution)
		 * 
		 * Now, problem with differrent screens density can't be solved with this snippet, because jquerymobile
		 * turns off zoom from version 1.1. So these strings should be removed but it's possible to find something
		 * that doesn't belong to the original snippet, between the strings. So I decided to leave they and delete
		 * only one string that set the webView density to FAR (It was the cause of the bug 
		 * https://jira.exadel.com/browse/ETST-5911)
		 * 
		 * Send your questions to egrybinnyk
		 */
        
		// get actual screen size
		Display display = ((WindowManager) getSystemService(Context.WINDOW_SERVICE))
				.getDefaultDisplay();
		int width = display.getWidth();
		int height = display.getHeight();

		// calculate target scale (only dealing with portrait
		// orientation)
		double globalScale = Math.ceil((width / ORIG_APP_W) * 100);

		// make sure we're all good
		Log.v("ORIG_APP_W", " = " + ORIG_APP_W);
		Log.v("ORIG_APP_H", " = " + ORIG_APP_H);
		Log.v("width", " = " + width);
		Log.v("this.appView.getMeasuredHeight()", " = " + height);
		Log.v("globalScale", " = " + globalScale);
		Log.v("this.appView.getScale()", "index=" + this.appView.getScale());

		// set some defaults on the web view
		this.appView.getSettings().setBuiltInZoomControls(false);
		this.appView.getSettings().setSupportZoom(true);
		this.appView.getSettings().setGeolocationEnabled(true);
		this.appView.getSettings().setLightTouchEnabled(true);

		this.appView.getSettings().setRenderPriority(
				WebSettings.RenderPriority.HIGH);

		// set the scale
		//this.appView.setInitialScale((int) globalScale);

	}

	/**
	 * overrided to avoid backing to first screen
	 * 
	 * @param newConfig
	 */
	@Override
	public void onConfigurationChanged(Configuration newConfig) {
		if (getResources().getConfiguration().orientation == Configuration.ORIENTATION_LANDSCAPE) {
			// do nothing
		} else if (getResources().getConfiguration().orientation == Configuration.ORIENTATION_PORTRAIT) {
			// do your task
		}
		super.onConfigurationChanged(newConfig);

	}

	private String getStartFileName() {
		String fileName = "index.html";
		try {
			InputStream fstream = getAssets().open("www/descriptor.txt");
			// Get the object of DataInputStream
			DataInputStream in = new DataInputStream(fstream);
			BufferedReader br = new BufferedReader(new InputStreamReader(in));
			String strLine = br.readLine();
			if (strLine != null) {
				fileName = strLine.trim();
			}
			in.close();
		} catch (Exception e) {// Catch exception if any
			System.err.println("Error: " + e.getMessage());
		}

		return fileName;
	}

}
