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

    public HiloCloseSpringApplication(appSIWC_SJApplication application, HiloClosingService hcs) {
        this.application = application;
        this.hiloCloseService = hcs;
    }

    @Override
    public void run() {
        try {
            hiloCloseService.join();
        } catch (InterruptedException ex) {
            ex.printStackTrace();
        }
        System.out.println("");
        System.out.println("START THREAD 2");
        try {
            application.serviceClosed();
        } catch (Exception e) {
            application.serviceStoped(e);
        }
        System.out.println("END THREAD 2");
        System.out.println("");
    }

}
