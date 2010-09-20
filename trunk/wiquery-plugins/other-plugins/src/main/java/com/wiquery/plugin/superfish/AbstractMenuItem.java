/**
 * 
 */
package com.wiquery.plugin.superfish;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.link.AbstractLink;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.model.IModel;

import com.wiquery.plugin.menu.IMenuItem;


/**
 * @author Ernesto Reinaldo Barreiro
 */
public abstract class AbstractMenuItem extends Panel implements IMenuItem {

	private static final long serialVersionUID = 1L;

	public AbstractMenuItem(IModel<String> title) {
		super("item", title);
		setRenderBodyOnly(true);
		AbstractLink link = newLink("link");
		add(link);
		link.add(new Label("title", title)
		.setRenderBodyOnly(true));
	}

	protected abstract AbstractLink newLink(String id); 
}
