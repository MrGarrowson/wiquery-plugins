/*
 * Copyright (c) 2009 WiQuery team
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
package org.wiquery.plugin.jquertytools.tooltip;

import org.odlabs.wiquery.core.javascript.JsScope;
import org.odlabs.wiquery.core.javascript.JsScopeContext;


/**
 * This class represent a JsScope event for the JQuery UI components
 * The javascript representation will be like this:
 * <p>
 * 	function(event) { ... }
 * </p>
 * @author Ernesto Reinaldo Barreiro
 * @since 1.0
 */
public abstract class JQueryToolsOnBeforeShowUiEvent extends JsScope {
	//Constants
	/**	Constant of serialization */
	private static final long serialVersionUID = 1L;
	
	/**Default constructor
	 */
	public JQueryToolsOnBeforeShowUiEvent() {
		super("event", "position");
	}
	
	/**
	 * Creates a default {@link JQueryToolsOnBeforeShowUiEvent} to execute the given statement.
	 * 
	 * @param javascriptCode
	 *            the JavaScript statement to execute with the scope.
	 * @return the created {@link JQueryToolsOnBeforeShowUiEvent}.
	 */
	public static JQueryToolsOnBeforeShowUiEvent quickScope(final CharSequence javascriptCode) {
		return new JQueryToolsOnBeforeShowUiEvent() {
			private static final long serialVersionUID = 1L;

			/* (non-Javadoc)
			 * @see org.odlabs.wiquery.core.javascript.JsScope#execute(org.odlabs.wiquery.core.javascript.JsScopeContext)
			 */
			@Override
			protected void execute(JsScopeContext scopeContext) {
				scopeContext.append(javascriptCode);
			}

		};
	}
}
