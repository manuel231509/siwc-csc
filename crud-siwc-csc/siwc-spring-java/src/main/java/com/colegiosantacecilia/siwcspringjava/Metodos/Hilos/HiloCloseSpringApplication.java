package com.colegiosantacecilia.siwcspringjava.Metodos.Hilos;

import com.colegiosantacecilia.siwcspringjava.GUI.appSIWC_SJApplication;

/**
 *
 * @author Sebastian Villamizar
 *
 */
public class HiloCloseSpringApplication extends Thread {

    public static boolean hilo2 = false;
    appSIWC_SJApplication application;

    HiloClosingService hiloCloseService;

    HiloServiceStopped hiloServiceStopped;

    public HiloCloseSpringApplication(appSIWC_SJApplication application, HiloClosingService hcs, HiloServiceStopped hss1) {
        this.application = application;
        this.hiloCloseService = hcs;
        this.hiloServiceStopped = hss1;
    }

    @Override
    public void run() {
        try {
            hiloCloseService.join();
        } catch (InterruptedException ex) {
            application.stopped(ex);
            hiloServiceStopped.start();
        }
        System.out.println("");
        System.out.println("START THREAD 2");
        try {
            application.serviceClosed();
        } catch (Exception e) {
            application.stopped(e);
            hiloServiceStopped.start();
        }
        System.out.println("END THREAD 2");
        System.out.println("");
        try {
            join();
        } catch (InterruptedException e1) {
            application.stopped(e1);
            hiloServiceStopped.start();
        }
    }

}
