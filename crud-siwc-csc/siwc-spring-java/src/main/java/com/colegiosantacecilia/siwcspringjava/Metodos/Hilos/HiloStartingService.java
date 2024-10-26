package com.colegiosantacecilia.siwcspringjava.Metodos.Hilos;

import com.colegiosantacecilia.siwcspringjava.GUI.appSIWC_SJApplication;

/**
 *
 * @author Sebastian Villamizar
 *
 */
public class HiloStartingService extends Thread {

    appSIWC_SJApplication application;

    public HiloStartingService(appSIWC_SJApplication app) {
        application = app;
    }

    @Override
    public void run() {
        System.out.println("START THREAD 1");

        application.startingService();

        int msegs = (int) (1000 + Math.random() * 3000);
        System.out.println("msegs:  " + msegs);
        try {
            System.out.println("BEFORE THE THREAD SLEEPS");
            sleep(msegs);
            System.out.println("AFTER THE THREAD SLEEPS");
        } catch (InterruptedException ex) {
            application.stopped(ex);
            application.serviceStopped();
        }

        System.out.println("END THREAD 1");
    }

}
