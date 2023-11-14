package com.colegiosantacecilia.siwcspringjava.Metodos.Hilos;

import com.colegiosantacecilia.siwcspringjava.GUI.appSIWC_SJApplication;

/**
 *
 * @author Sebastian Villamizar
 *
 */
public class HiloClosingService extends Thread {

    public static boolean hilo1 = false;
    appSIWC_SJApplication application;

    public HiloClosingService(appSIWC_SJApplication application) {
        this.application = application;
    }

    @Override
    public void run() {
        System.out.println("");
        System.out.println("START THREAD 1");
        application.closingService();
        int msegs = (int) (1000 + Math.random() * 5000);
        System.out.println("msegs:  " + msegs);
        try {
            System.out.println("BEFORE THE THREAD SLEEPS 1");
            sleep(msegs);
            System.out.println("AFTER THE THREAD SLEEPS 1");
        } catch (InterruptedException ex) {
            ex.printStackTrace();
        }
        System.out.println("END THREAD 1");
        System.out.println("");
    }
}
