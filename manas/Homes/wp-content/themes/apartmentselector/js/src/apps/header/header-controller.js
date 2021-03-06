var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['extm', 'src/apps/header/header-view'], function(Extm, HeaderView) {
  var HeaderController;
  HeaderController = (function(_super) {
    __extends(HeaderController, _super);

    function HeaderController() {
      return HeaderController.__super__.constructor.apply(this, arguments);
    }

    HeaderController.prototype.initialize = function(opt) {
      var view;
      if (opt == null) {
        opt = {};
      }
      this.model = this._getHeader();
      this.view = view = this._getHeaderView(this.model);
      return this.show(view);
    };

    HeaderController.prototype._getHeaderView = function(model) {
      return new HeaderView({
        textString: model[0],
        templateHelpers: {
          textString: model[0],
          textClass: model[1]
        }
      });
    };

    HeaderController.prototype._getHeader = function() {
      var btnClass, buildingModel, f, first, flag, floorriserange, myArray, param, paramkey, range, templateArr, templateString, textClass, track, trackArray, units;
      templateArr = [];
      flag = 0;
      myArray = [];
      param = {};
      paramkey = {};
      flag = 0;
      track = 0;
      f = 1;
      trackArray = [];
      units = App.master.unit;
      $.map(App.defaults, function(value, index) {
        if (value !== 'All') {
          return myArray.push({
            key: index,
            value: value
          });
        }
      });
      $.each(myArray, function(index, value) {
        var budget_Val, element, key, string_val, valuearr, _i, _len, _results;
        if (value.value !== 'All') {
          param[value.key] = value.value;
          string_val = _.isString(value.value);
          valuearr = "";
          if (string_val === true) {
            valuearr = value.value.split(',');
          }
          if (valuearr.length > 1) {
            _results = [];
            for (_i = 0, _len = valuearr.length; _i < _len; _i++) {
              element = valuearr[_i];
              if (value.key === 'unitType') {
                key = App.master.unit_type.findWhere({
                  id: parseInt(element)
                });
                templateArr.push('<span>' + key.get('name') + '</span>');
              }
              if (value.key === 'budget') {
                budget_Val = value + 'lakhs';
                templateArr.push('<span>' + budget_Val + '</span>');
              }
              if (value.key === 'building') {
                key = App.master.building.findWhere({
                  id: parseInt(element)
                });
                templateArr.push('<span>' + key.get('name') + '</span>');
              }
              if (value.key === 'floor') {
                if (track === 0) {
                  trackArray.push(value.value);
                }
                flag = 1;
                _results.push(track = 1);
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          } else {
            if (value.key === 'unitType') {
              key = App.master.unit_type.findWhere({
                id: parseInt(value.value)
              });
              templateArr.push('<span>' + key.get('name') + '</span>');
            }
            if (value.key === 'budget') {
              budget_Val = value.value;
              templateArr.push('<span>' + budget_Val + '</span>');
            }
            if (value.key === 'building') {
              key = App.master.building.findWhere({
                id: parseInt(value.value)
              });
              templateArr.push('<span>' + key.get('name') + '</span>');
            }
            if (value.key === 'floor') {
              if (track === 0) {
                trackArray.push(value.value);
              }
              flag = 1;
              return track = 1;
            }
          }
        }
      });
      if (templateArr.length === 0) {
        templateArr.push('<span>All</span>');
      }
      if (flag === 1) {
        buildingModel = App.currentStore.building.findWhere({
          id: App.defaults['building']
        });
        floorriserange = buildingModel.get('floorriserange');
        first = _.first(trackArray);
        if (parseInt(first) >= parseInt(floorriserange[0].start) && parseInt(first) <= parseInt(floorriserange[0].end)) {
          range = 'Lowrise';
          templateArr.push('<span>' + range + '</span>');
        }
        if (parseInt(first) >= parseInt(floorriserange[1].start) && parseInt(first) <= parseInt(floorriserange[1].end)) {
          range = 'Midrise';
          templateArr.push('<span>' + range + '</span>');
        }
        if (parseInt(first) >= parseInt(floorriserange[2].start) && parseInt(first) <= parseInt(floorriserange[2].end)) {
          range = 'Highrise';
          templateArr.push('<span>' + range + '</span>');
        }
        templateString = templateArr;
      } else {
        templateString = templateArr;
      }
      textClass = "hidden";
      btnClass = "";
      if (window.location.href.indexOf('screen-two') > -1 || window.location.href.indexOf('screen-three') > -1 || window.location.href.indexOf('screen-four') > -1) {
        textClass = "";
      } else if (window.location.href.indexOf('wishList') > -1) {
        templateString = "<span>WishList Comparison</span>";
        textClass = "";
        btnClass = "hidden";
      } else {
        templateString = "<span>Apartment Selector</span>";
      }
      $('#textstring').text("");
      return [templateString, textClass];
    };

    return HeaderController;

  })(Extm.RegionController);
  return msgbus.registerController('header', HeaderController);
});
