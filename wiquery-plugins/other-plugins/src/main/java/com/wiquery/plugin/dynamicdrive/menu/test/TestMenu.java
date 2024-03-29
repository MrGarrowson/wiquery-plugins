package com.wiquery.plugin.dynamicdrive.menu.test;

import org.apache.wicket.ResourceReference;
import org.apache.wicket.markup.html.panel.Panel;

import com.wiquery.plugin.dynamicdrive.menu.Menubar;
import com.wiquery.plugin.dynamicdrive.menu.SubMenubar;


/**
 * 
 * @author Ernesto Reinaldo Barreiro (reiern70@gmail.com)
 *
 */
public class TestMenu extends Panel  {

	private static final long serialVersionUID = 1L;	
	
	public TestMenu(String id) {		
		super(id);
		//add(new TestPanel("test"));		
		Menubar menubar = new Menubar("test") {
			/**
			 * 
			 */
			private static final long serialVersionUID = 1L;

			@Override
			protected ResourceReference newMenuCss() {
				return Menubar.SLIDEMENU_CSS_BLUE;
			}
		};
		add(menubar);
		
		menubar.addItem(new ExternalLink("google", "http://www.google.com/ncr", "Google Inc"));
		
		SubMenubar subMenubar = new SubMenubar("Sub-Menu-One-1", menubar) {
			/**
			 * 
			 */
			private static final long serialVersionUID = 1L;

			@Override
			protected String getTitle() {
				return "Sub-Menu-One-1";
			}
		};
		
		subMenubar.addItem(new ExternalLink("dynamicdrive", "http://www.dynamicdrive.com/style/csslibrary/item/jquery_multi_level_css_menu_2/","Dynamicdrive1"));
		subMenubar.addItem(new ExternalLink("dynamicdrive2", "http://www.dynamicdrive.com/style/csslibrary/item/jquery_multi_level_css_menu_2/","Dynamicdrive2"));
		
		subMenubar = new SubMenubar("Two-2", menubar) {
			/**
			 * 
			 */
			private static final long serialVersionUID = 1L;

			@Override
			protected String getTitle() {
				return "Sub-Menu-Two-2";
			}
		};
		subMenubar.addItem(new ExternalLink("dynamicdrive", "http://www.dynamicdrive.com/style/csslibrary/item/jquery_multi_level_css_menu_2/", "Dynamicdrive"));
		subMenubar.addItem(new ExternalLink("dynamicdrive2", "http://www.dynamicdrive.com/style/csslibrary/item/jquery_multi_level_css_menu_2/", "Dynamicdrive2"));
		

		SubMenubar subMenubar2 = new SubMenubar("Two-2-1", subMenubar) {
			
			private static final long serialVersionUID = 1L;

			@Override
			protected String getTitle() {
				return "Two-2-1";
			}
		};
		
		subMenubar2.addItem(new ExternalLink("dynamicdrive", "http://www.dynamicdrive.com/style/csslibrary/item/jquery_multi_level_css_menu_2/", "Dynamicdrive"));
		subMenubar2.addItem(new ExternalLink("dynamicdrive2", "http://www.dynamicdrive.com/style/csslibrary/item/jquery_multi_level_css_menu_2/", "Dynamicdrive2"));

		SubMenubar subMenubar3 = new SubMenubar("Two-2-1-1", subMenubar2) {
			
			private static final long serialVersionUID = 1L;

			@Override
			protected String getTitle() {
				return "Two-2-1-1";
			}
		};
		
		subMenubar3.addItem(new ExternalLink("dynamicdrive", "http://www.dynamicdrive.com/style/csslibrary/item/jquery_multi_level_css_menu_2/", "Dynamicdrive"));
		subMenubar3.addItem(new ExternalLink("dynamicdrive2", "http://www.dynamicdrive.com/style/csslibrary/item/jquery_multi_level_css_menu_2/", "Dynamicdrive2"));
		subMenubar3.addItem(new ExternalLink("google", "http://www.google.com/ncr", "Google Inc"));
		
		menubar.addItem(new ExternalLink("dynamicdrive2", "http://www.dynamicdrive.com/style/csslibrary/item/jquery_multi_level_css_menu_2/", "Dynamicdrive2"));
	}

	
}
