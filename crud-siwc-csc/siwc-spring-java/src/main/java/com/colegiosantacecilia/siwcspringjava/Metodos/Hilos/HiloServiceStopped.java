package com.colegiosantacecilia.siwcspringjava.Metodos.Hilos;

import com.colegiosantacecilia.siwcspringjava.GUI.appSIWC_SJApplication;

/**
 *
 * @author Sebastian Villamizar
 *
 */
public class HiloServiceStopped extends Thread {

    appSIWC_SJApplication application;
    HiloSpringApplication hiloSpringApplication;

    public HiloServiceStopped(appSIWC_SJApplication app) {
        application = app;
    }

    public void setHiloSpringApplication(HiloSpringApplication hsa) {
        this.hiloSpringApplication = hsa;
    }

    @Override
    public void run() {
        System.out.println("START THREAD SERVICE STOPPED");

        try {
            hiloSpringApplication.join();
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
            application.serviceStopped();
        } catch (InterruptedException ex) {
            application.stopped(ex);
            application.serviceStopped();
        }

        try {
            join();
        } catch (InterruptedException e1) {
            application.stopped(e1);
            application.serviceStopped();
        }
        System.out.println("END THREAD SERVICE STOPPED");
    }

}
