package com.inqle.web;

import org.apache.wicket.Page;
import org.apache.wicket.protocol.http.HttpSessionStore;
import org.apache.wicket.protocol.http.WebApplication;
import org.apache.wicket.session.ISessionStore;

/**
 * Application object for your web application.
 */
public class SampleApplication extends WebApplication
{
    public Class<? extends Page> getHomePage()
    {
        return BasePage.class;
    }

    @Override
    protected void init()
    {
        super.init();

        // for Google App Engine
        getResourceSettings().setResourcePollFrequency(null);

        // Enable Guice for field injection on Wicket pages.  Unfortunately, constructor injection into
        // pages is not supported.  Supplying ServletModule is optional; it enables usage of @RequestScoped and
        // @SessionScoped, which may not be useful for Wicket applications because the WebPage instances are
        // already stored in session, with their dependencies injected once per session.
        //addComponentInstantiationListener(new GuiceComponentInjector(this, new GuiceModule()));
//        addComponentInstantiationListener(new GuiceComponentInjector(this, new ServletModule(), new GuiceModule()));
    }

    @Override
    protected ISessionStore newSessionStore()
    {
        // for Google App Engine
        return new HttpSessionStore(this);
    }
}
