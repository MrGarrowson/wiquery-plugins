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
package org.odlabs.wiquery.plugins.ckeditor.options.scope;

import org.odlabs.wiquery.core.javascript.JsScope;
import org.odlabs.wiquery.core.javascript.JsScopeContext;
import org.odlabs.wiquery.core.javascript.JsStatement;


/**
 * $Id$
 * 
 * This class represent a JsScope for the elementpaths_filter options
 * The javascript representation will be like this:
 * <p>
 * 	function(element) { ... }
 * </p>
 * @author Julien Roche
 * @since 1.0
 */
public abstract class ElementPathScope extends JsScope {
	//Constants
	/**	Constant of serialization */
	private static final long serialVersionUID = 1L;
	
	/**Default constructor
	 */
	public ElementPathScope() {
		super("element");
	}
	
	/**
	 * Creates a default {@link ElementPathScope} to execute the given statement.
	 * 
	 * @param javascriptCode
	 *            the JavaScript statement to execute with the scope.
	 * @return the created {@link ElementPathScope}.
	 */
	public static ElementPathScope quickScope(final CharSequence javascriptCode) {
		return new ElementPathScope() {
			private static final long serialVersionUID = 1L;

			/**
			 * {@inheritDoc}
			 * @see org.odlabs.wiquery.core.javascript.JsScope#execute(org.odlabs.wiquery.core.javascript.JsScopeContext)
			 */
			@Override
			protected void execute(JsScopeContext scopeContext) {
				scopeContext.append(javascriptCode);
			}

		};
	}
	
	/**
	 * Creates a default {@link ElementPathScope} to execute the given statement.
	 * 
	 * @param jsStatement
	 *            the JavaScript statement to execute with the scope.
	 * @return the created {@link ElementPathScope}.
	 */
	public static ElementPathScope quickScope(final JsStatement jsStatement) {
		return new ElementPathScope() {
			private static final long serialVersionUID = 1L;

			/**
			 * {@inheritDoc}
			 * @see org.odlabs.wiquery.core.javascript.JsScope#execute(org.odlabs.wiquery.core.javascript.JsScopeContext)
			 */
			@Override
			protected void execute(JsScopeContext scopeContext) {
				scopeContext.append(jsStatement == null ? "" : jsStatement.render());
			}
		};
	}
}
