package com.wiquery.plugins.demo;

import java.util.ArrayList;
import java.util.List;

import org.apache.wicket.Request;
import org.apache.wicket.ResourceReference;
import org.apache.wicket.Response;
import org.apache.wicket.Session;
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.protocol.http.WebApplication;
import org.odlabs.wiquery.ui.themes.IThemableApplication;

import com.wiquery.plugins.demo.test.Person;


/**
 * Application object for your web application. If you want to run this application without deploying, run the Start class.
 * 
 * @see com.wiquery.plugins.test.Start#main(String[])
 */
public class WicketApplication extends WebApplication implements IThemableApplication
{    
	
	private static List<Person> persons;
	
    /**
     * Constructor
     */
	public WicketApplication()
	{
	}
	
	/**
	 * @see org.apache.wicket.Application#getHomePage()
	 */
	public Class<? extends WebPage> getHomePage()
	{
		return HomePage.class;
	}
	
	@Override
	protected void init() {
		getDebugSettings().setOutputMarkupContainerClassName(false);
		getMarkupSettings().setStripWicketTags(true);
		super.init();
	}

	public ResourceReference getTheme(Session session) {
		return DemoSession.getSession().getTheme().getTheme();
	}
	
	 public List<Person> getPersons() {
    	if(persons == null) {    		
    		persons = new ArrayList<Person>();
    		for(int i=0; i<205;i++) {
    			Person person = new Person();
    			person.setId(new Long(i));
    			person.setName("Name-" + i);
    			person.setLastName("LastName-" + i);
    			persons.add(person);
    		}    		
    	}
    	return persons;
    }
	 
	public static WicketApplication getWicketApplication() {
		return (WicketApplication)WebApplication.get();
	}
	
	@Override
	public Session newSession(Request request, Response response) {
		return new DemoSession(request);
	}

}
