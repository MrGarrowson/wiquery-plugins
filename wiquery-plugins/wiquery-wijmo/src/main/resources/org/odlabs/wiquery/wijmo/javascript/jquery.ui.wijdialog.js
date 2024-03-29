/*
 *
 * Wijmo Library 0.8.0
 * http://wijmo.com/
 *
 * Copyright(c) ComponentOne, LLC.  All rights reserved.
 * 
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * licensing@wijmo.com
 * http://www.wijmo.com/license
 *
 * * Wijmo Dialog widget.
 *
 * Depends:
 *	jquery.ui.core.js
 *	jquery.ui.widget.js
 *	jquery.ui.dialog.js
 *	jquery.ui.wijutil.js
 *
 */
(function ($) {

	var uiStateHover = "ui-state-hover", zonCSS = "ui-wijdialog-defaultdockingzone";

	$.widget("ui.wijdialog", $.ui.dialog, {
		options: {
			/// <summary>
			/// An object determines the caption buttons to show on wijdialog title bar. 
			/// Type: Object.
			/// Default: {}
			/// </summary>
			/// <remarks>
			/// The default value for this option is: 
			/// {
			///	pin: {visible: true, click: self.pin, iconClassOn: "ui-icon-pin-w", iconClassOff:"ui-icon-pin-s"},
			///	refresh: {visible: true, click: self.refresh, iconClassOn: "ui-icon-refresh"},
			///	toggle: {visible: true, click: self.toggle, iconClassOn: "ui-icon-carat-1-n", iconClassOff:"ui-icon-carat-1-s"},
			///	minimize: {visible: true, click: self.minimize, iconClassOn: "ui-icon-minus"},
			///	maximize: {visible: true, click: self.maximize, iconClassOn: "ui-icon-extlink"},
			///	close: {visible: true, click: self.close, iconClassOn: "ui-icon-close"}
			/// };
			/// Each button is represented by an object in this object. 
			/// property name: The name of the button.
			/// visible: A value specifies whether this button is visible.
			/// click: The event handler to handle the click event of this button.
			/// iconClassOn: Icon for normal state.
			/// iconClassOff: Icon after clicking.
			/// </remarks>
			captionButtons: {},
			/// <summary>
			/// A value determines the settings of the animation effect to be used when the wijdialog is collapsed.
			/// Type: Object.
			/// Default: null.
			/// </summary>
			collapsingAnimation: null,
			/// <summary>
			/// A value determines the settings of the animation effect to be used when the wijdialog is expanded.
			/// Type: Object.
			/// Default: null.
			/// </summary>
			expandingAnimation: null,
			/// <summary>
			/// A URL string specifies the URL for the iframe element inside wijdialog.
			/// Type: String.
			/// Default: "".
			/// </summary>
			contentUrl: "",
			/// <summary>
			/// A string specifies the ID of the DOM element to dock to when wijdialog is minimized.
			/// Type: String.
			/// Default: "".
			///	</summary>
			minimizeZoneElementId: ""
		},

		_create: function () {
			var self = this;
			$.ui.dialog.prototype._create.apply(self, arguments);
			self.uiDialog.addClass("ui-wijdialog");
			self._initWijWindow();
			self._bindWindowResize();
		},

		_initWijWindow: function () {
			var self = this;
			self._createCaptionButtons();
			self._checkUrl();
			self.uiDialogButtonPane = $(".ui-dialog-buttonpane", self.uiDialog);
		},

		_checkUrl: function () {
			var self = this;
			var o = self.options;
			var url = o.contentUrl;
			if (typeof url === "string" && url.length > 0) {
				self.element.addClass("ui-wijdialog-hasframe");

				var innerFrame = $('<iframe style="width:100%;height:99%;" frameborder="0"></iframe>');
				innerFrame.attr("src", url);
				self.element.append(innerFrame);
				self.innerFrame = innerFrame;
			}
			self.contentWrapper = self.element;
		},

		_createCaptionButtons: function () {
			var captionButtons = [];
			var self = this;
			var o = self.options;
			var buttons = {
				pin: { visible: true, click: self.pin, iconClassOn: "ui-icon-pin-w", iconClassOff: "ui-icon-pin-s" },
				refresh: { visible: true, click: self.refresh, iconClassOn: "ui-icon-refresh" },
				toggle: { visible: true, click: self.toggle, iconClassOn: "ui-icon-carat-1-n", iconClassOff: "ui-icon-carat-1-s" },
				minimize: { visible: true, click: self.minimize, iconClassOn: "ui-icon-minus" },
				maximize: { visible: true, click: self.maximize, iconClassOn: "ui-icon-extlink" },
				close: { visible: true, click: self.close, iconClassOn: "ui-icon-close" }
			};
			var oCaptionButtons = o.captionButtons;
			var uiDialogTitlebar = self.uiDialogTitlebar;
			$.extend(buttons, oCaptionButtons);
			uiDialogTitlebar.children(".ui-dialog-titlebar-close, .ui-wijdialog-captionbutton").remove();
			// recreate buttons
			$.each(buttons, function (name, value) {
				captionButtons.push({ button: name, info: value });
			});
			self._trigger("buttoncreating", null, captionButtons);
			for (var i = captionButtons.length - 1; i >= 0; i--) {
				self._createCaptionButton(captionButtons[i], uiDialogTitlebar);
			}
		},

		_createCaptionButton: function (buttonHash, uiDialogTitlebar, notAppendToHeader) {
			var self = this;
			var buttonObject;
			var buttonCSS = "ui-wijdialog-titlebar-" + buttonHash.button;
			var button = uiDialogTitlebar.children("." + buttonCSS);
			var info = buttonHash.info;
			if (info.visible) {
				if (button.size() === 0) {
					var buttonIcon = $("<span></span>")
					.addClass(
						"ui-icon " +
						info.iconClassOn
					)
					.text(buttonHash.button);
					buttonObject = $('<a href="#"></a>')
					.append(buttonIcon)
					.addClass(buttonCSS + " ui-corner-all ui-wijdialog-captionbutton")
					.attr("role", "button")
					.hover(
						function () {
							buttonObject.addClass(uiStateHover);
						},
						function () {
							buttonObject.removeClass(uiStateHover);
						}
					)
					.click(function (event) {
						if (buttonIcon.hasClass(info.iconClassOff)) {
							buttonIcon.removeClass(info.iconClassOff);
						}
						else {
							buttonIcon.addClass(info.iconClassOff);
						}
						if ($.isFunction(info.click)) {
							info.click.apply(self, arguments);
						}
						event.preventDefault();
						return false;
					});
					if (notAppendToHeader) {
						return buttonObject;
					}
					else {
						buttonObject.appendTo(uiDialogTitlebar);
					}
				}
				self[buttonHash.button + "Button"] = buttonObject;
			}
			else {
				button.remove();
			}
		},

		pin: function () {
			///	<summary>
			///		Pins the wijwindow instance so that it could not be moved.
			///	</summary>

			var uiDialog = this.uiDialog;
			var drag = uiDialog.draggable("option", "disabled");
			uiDialog.draggable({ disabled: !drag });
			// remove ui-state-disabled because we are not disabling dialog.
			if (!drag) {
				uiDialog.removeClass("ui-state-disabled");
			}
		},

		refresh: function () {
			///	<summary>
			///		Refreshes the iframe content in C1Window.
			///	</summary>

			var fr = this.innerFrame;
			if (fr !== undefined) {
				fr.attr("src", fr.attr("src"));
			}
		},

		toggle: function () {
			var self = this;

			// TODO : toggle animation and event invoking.
			if (self.collapsed === undefined || !self.collapsed) {
				self.collapsed = true;
				self._collapseDialogContent(true);
			}
			else {
				self.collapsed = false;
				self._expandDialogContent(true);
			}
		},

		_expandDialogContent: function (fireEvent) {
			var self = this;
			var o = self.options;
			self.uiDialog.height("auto");
			var animationSetting = o.expandingAnimation;
			if (fireEvent && animationSetting !== null) {
				self.contentWrapper.show(animationSetting.effect, animationSetting.options, animationSetting.speed, function (e) {
					self.uiDialog.css("height", self._toggleHeight);
					if ($.isFunction(animationSetting.callback)) {
						animationSetting.callback(e);
					}
					self._enableDisableResizer(false);
				});
			}
			else {
				self.contentWrapper.show();
				self._enableDisableResizer(false);
				self.uiDialog.css("height", self.toggleHeight);
			}
		},

		_collapseDialogContent: function (fireEvent) {
			var self = this;
			var o = self.options;
			self._enableDisableResizer(true);
			self._toggleHeight = self.uiDialog[0].style.height;
			self.uiDialog.height("auto");
			var animationSetting = o.collapsingAnimation;
			if (fireEvent && animationSetting !== null) {
				self.contentWrapper.hide(animationSetting.effect, animationSetting.options, animationSetting.speed);
			}
			else {
				self.contentWrapper.hide();
			}
		},

		_enableDisableResizer: function (disabled) {
			var dlg = this.uiDialog;
			dlg.resizable({ disabled: disabled });
			if (disabled) {
				dlg.removeClass("ui-state-disabled");
			}
		},

		_enableDisableDragger: function (disabled) {
			var dlg = this.uiDialog;
			dlg.draggable({ disabled: disabled });
			if (disabled) {
				dlg.removeClass("ui-state-disabled");
			}
		},

		minimize: function () {
			///	<summary>
			///		Minimizes wijWindow.
			///	</summary>

			var self = this;
			var dlg = self.uiDialog;
			// only minimize from normal,maximized state
			if (!self.minimized) {
				self.minimized = true;
				var o = self.options;
				var miniZone = null;
				if (self.maximized) {
					self.maximized = false;
					self.restoreButton.remove(); //fixed bug can't minimize window when it's maximized
					$(window).unbind(".onWinResize");
				}
				else { // minimize from normal state
					self._saveNormalState();
				}
				// disable resizer
				self._enableDisableResizer(true);
				//hide content

				var $from = $("<div></div>")
				.appendTo(document.body)
				.css({
					top: self.uiDialog.offset().top,
					left: self.uiDialog.offset().left,
					height: self.uiDialog.innerHeight(),
					width: self.uiDialog.innerWidth(),
					position: "absolute"
				});

				self.contentWrapper.hide();
				if (self.uiDialogButtonPane.length) {
					self.uiDialogButtonPane.hide();
				}
				// remove size restriction
				dlg.height("auto");
				dlg.width("auto");
				self._doButtonAction(self.minimizeButton, "hide");
				self._restoreButton(true, self.minimizeButton, "After");
				self._doButtonAction(self.pinButton, "hide");
				self._doButtonAction(self.refreshButton, "hide");
				self._doButtonAction(self.toggleButton, "hide");
				self._doButtonAction(self.maximizeButton, "show");
				if (o.minimizeZoneElementId.length > 0) {
					miniZone = $("#" + o.minimizeZoneElementId);
				}
				if (miniZone !== null && miniZone.size() > 0) {
					miniZone.append(self.uiDialog);
				}
				else {
					var defaultZone = $("." + zonCSS);
					if (defaultZone.size() === 0) {
						defaultZone = $('<div class="' + zonCSS + '"></div>');
						$(document.body).append(defaultZone);
					}
					defaultZone.append(self.uiDialog).css("z-index", dlg.css("z-index"));
				}
				self.uiDialog.css("position", "static");
				self.uiDialog.css("float", "left");

				var $to = $("<div></div>")
				.appendTo(document.body)
				.css({
					top: self.uiDialog.offset().top,
					left: self.uiDialog.offset().left,
					height: self.uiDialog.innerHeight(),
					width: self.uiDialog.innerWidth(),
					position: "absolute"
				});
				self.uiDialog.hide();

				$from.effect("transfer", {
					to: $to,
					className: "ui-widget-content"
				}, 100, function () {
					$from.remove();
					$to.remove();
					self.uiDialog.show();
				});
			}
		},

		_doButtonAction: function (button, action) {
			if (button !== undefined) {
				button.removeClass(uiStateHover);
				button[action]();
			}
		},

		maximize: function () {
			var self = this;

			if (!self.maximized) {
				self.maximized = true;
				// maximized from minimized state
				if (self.minimized) {
					self.restore(); //bug in IE when minimize -> maximize -> restore
				}
				else if (self.collapsed) {
					self._expandDialogContent(false);
				}
				if (self.maximizeButton !== undefined) {
					self.maximizeButton.hide();
					self._restoreButton(true, self.maximizeButton, "Before");
				}
				self._saveNormalState();
				var w = $(window);
				self._onWinResize(self, w);
				if (self.collapsed) {
					self._collapseDialogContent(false);
				}
				/// TODO : bind resize event.  
				self.uiDialog.resizable({ disabled: true });
				self.uiDialog.removeClass("ui-state-disabled");
			}
		},

		_bindWindowResize: function () {
			var self = this;
			$(window).resize(function () {
				if (self.maximized) {
					var w = $(window);
					self._onWinResize(self, w);
				}
			});
		},

		_saveNormalState: function () {
			var self = this;
			var dialog = self.uiDialog;
			var ele = self.element;
			self.normalWidth = dialog.css("width");
			self.normalLeft = dialog.css("left");
			self.normalTop = dialog.css("top");
			self.normalHeight = dialog.css("height");

			self.normalInnerHeight = ele.css("height");
			self.normalInnerWidth = ele.css("width");
			self.normalInnerMinWidth = ele.css("min-width");
			self.normalInnerMinHeight = ele.css("min-height");
		},

		_onWinResize: function (self, w) {
			self.uiDialog.css("top", w.scrollTop());
			self.uiDialog.css("left", w.scrollLeft());
			self.uiDialog.setOutWidth(w.width());
			self.uiDialog.setOutHeight(w.height());
			self._resizeDialog(self);
		},

		_restoreButton: function (show, button, position) {
			var self = this;
			var buttonHash = { button: "restore", info: {
				visible: show,
				click: self.restore,
				iconClassOn: "ui-icon-newwin"
			}
			};
			var restore = self._createCaptionButton(buttonHash, self.uiDialogTitlebar, true);
			if (show) {
				restore["insert" + position](button);
				self.restoreButton = restore;
			}
		},

		restore: function () {
			///	<summary>
			///		Restores wijdialog to normal size from minimized and maximized state.
			///	</summary>

			var self = this;
			var dlg = self.uiDialog;
			// restore form minimized state.
			if (self.minimized) {
				self.minimized = false;

				var $from = $("<div></div>")
				.appendTo(document.body)
				.css({
					top: self.uiDialog.offset().top,
					left: self.uiDialog.offset().left,
					height: self.uiDialog.innerHeight(),
					width: self.uiDialog.innerWidth(),
					position: "absolute"
				});

				dlg.css("position", "absolute");
				dlg.css("float", "");
				dlg.appendTo(document.body);
				self._enableDisableResizer(false);
				//self._enableDisableDragger(false);
				self._restoreToNormal();
				self.contentWrapper.show();
				if (self.uiDialogButtonPane.length) {
					self.uiDialogButtonPane.show();
				}
				var $to = $("<div></div>")
				.appendTo(document.body)
				.css({
					top: self.uiDialog.offset().top,
					left: self.uiDialog.offset().left,
					height: self.uiDialog.innerHeight(),
					width: self.uiDialog.innerWidth(),
					position: "absolute"
				});

				self.uiDialog.hide();
				$from.effect("transfer", {
					to: $to,
					className: "ui-widget-content"
				}, 150, function () {
					self.uiDialog.show();
					$from.remove();
					$to.remove();
				});

				if (self.collapsed) {
					self._collapseDialogContent();
				}
				self._doButtonAction(self.minimizeButton, "show");
				self._doButtonAction(self.restoreButton, "remove");
				self._doButtonAction(self.pinButton, "show");
				self._doButtonAction(self.refreshButton, "show");
				self._doButtonAction(self.toggleButton, "show");
			}
			else if (self.maximized) {
				self.maximized = false;
				$(window).unbind(".onWinResize");
				if (self.collapsed) {
					self._expandDialogContent();
				}
				self._enableDisableResizer(false);
				//self._enableDisableDragger(false);
				self._restoreToNormal();
				self.contentWrapper.show();
				if (self.collapsed) {
					self._collapseDialogContent();
				}
				if (self.maximizeButton !== undefined) {
					self.maximizeButton.show();
					self._restoreButton(false, self.maximizeButton, "before");
				}
			}
		},

		open: function () {
			var self = this;
			if (!self.minimized) {
				$.ui.dialog.prototype.open.apply(self, arguments);
			}
			else {
				self.uiDialog.show();
			}
		},

		_resizeDialog: function (self) {
			self.options.width = self.uiDialog.width();
			self.options.height = self.uiDialog.height();
			self._size();
		},

		_restoreToNormal: function () {
			var self = this;
			var dialog = self.uiDialog;
			var ele = self.element;
			dialog.css("width", self.normalWidth);
			dialog.css("left", self.normalLeft);
			dialog.css("top", self.normalTop);
			dialog.css("height", self.normalHeight);

			ele.css("height", self.normalInnerHeight);
			ele.css("width", self.normalInnerWidth);
			ele.css("min-width", self.normalInnerMinWidth);
			ele.css("min-height", self.normalInnerMinHeight);

			self.options.width = self.normalWidth;
			self.options.height = self.normalHeight;
		}
	});

})(jQuery);
