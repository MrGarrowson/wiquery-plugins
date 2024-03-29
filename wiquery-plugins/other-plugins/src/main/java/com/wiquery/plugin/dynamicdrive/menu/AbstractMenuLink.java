package com.wiquery.plugin.dynamicdrive.menu;

import org.apache.wicket.markup.html.link.AbstractLink;
import org.apache.wicket.markup.html.panel.Panel;

import com.wiquery.plugin.menu.IMenuItem;

/**
 * 
 * @author  Ernesto Reinaldo Barreiro (reiern70@gmail.com)
 *
 */
public abstract class AbstractMenuLink  extends Panel implements IMenuItem{

	private static final long serialVersionUID = 1L;

	public AbstractMenuLink(String id) {
		super(id);		
	}
	
	@Override
	protected void onBeforeRender() {		
		addOrReplace(newLink("link"));
		super.onBeforeRender();
	}
	
	protected abstract AbstractLink newLink(String id);
	
}
