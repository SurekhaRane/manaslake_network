// Generated by CoffeeScript 1.7.1
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['extm', 'src/apps/popup/popup-view'], function(Extm, PopupView) {
  var PopupController;
  PopupController = (function(_super) {
    __extends(PopupController, _super);

    function PopupController() {
      return PopupController.__super__.constructor.apply(this, arguments);
    }

    PopupController.prototype.initialize = function(opt) {
      if (opt == null) {
        opt = {};
      }
      return this.getAjaxData();
    };

    PopupController.prototype._getPopupView = function(Collection, classnamearr) {
      return new PopupView({
        collection: Collection,
        templateHelpers: {
          selection: classnamearr
        }
      });
    };

    PopupController.prototype._getUnitsCountCollection = function(modelstring) {
      var act, actroom, actroomColl, actualroom, buildingModel, classnamearr, coll, cookeArray, element, exceptionObject, facingModel, facingModelArray, facingssArray, floorLayoutimage, floorriserange, i, id, mainArr, rangeArrayVal, roomSizesArray, roomSizesObject, roomTypeArr, roomcoll, roomsizearr, roomsizearray, roomsizesCollection, terraceoptions, terraceoptionstext, unitCollection, unitModel, unitModelArray, unitTypeModel, unitTypeModelName, unitVariantModel, view, viewModel, viewModelArray, viewsArray, _i, _j, _k, _l, _len, _len1, _len2, _len3;
      cookeArray = modelstring;
      unitModelArray = [];
      classnamearr = [];
      roomcoll = [];
      actualroom = [];
      actroomColl = "";
      act = [];
      if (cookeArray.length !== 0) {
        for (_i = 0, _len = cookeArray.length; _i < _len; _i++) {
          element = cookeArray[_i];
          unitModel = element;
          unitVariantModel = App.master.unit_variant.findWhere({
            id: unitModel.get('unitVariant')
          });
          roomSizesObject = unitVariantModel.get('roomsizes');
          roomSizesArray = $.map(roomSizesObject, function(index, value1) {
            return roomcoll.push({
              id: index.room_type_id,
              name: index.room_type
            });
          });
        }
      }
      roomcoll = _.uniq(roomcoll);
      floorLayoutimage = "";
      if (cookeArray.length !== 0) {
        for (_j = 0, _len1 = cookeArray.length; _j < _len1; _j++) {
          element = cookeArray[_j];
          unitModel = element;
          actualroom = [];
          buildingModel = App.master.building.findWhere({
            id: unitModel.get('building')
          });
          exceptionObject = buildingModel.get('floorexceptionpositions');
          $.each(exceptionObject, function(index, value1) {
            var floorvalue;
            floorvalue = $.inArray(unitModel.get('floor'), value1.floors);
            if (floorvalue === -1) {
              return floorLayoutimage = buildingModel.get('floor_layout_detailed').image_url;
            } else {
              if (value1.floor_layout_detailed.image_url === "") {
                return floorLayoutimage = buildingModel.get('floor_layout_detailed').image_url;
              } else {
                return floorLayoutimage = value1.floor_layout_detailed.image_url;
              }
            }
          });
          if (exceptionObject.legth === 0) {
            floorLayoutimage = building.get('floor_layout_detailed').image_url;
          }
          floorriserange = buildingModel.get('floorriserange');
          rangeArrayVal = [];
          i = 0;
          $.each(floorriserange, function(index, value) {
            var end, rangename, start;
            rangeArrayVal = [];
            i = 0;
            start = parseInt(value.start);
            end = parseInt(value.end);
            while (parseInt(start) <= parseInt(end)) {
              rangeArrayVal[i] = start;
              start = parseInt(start) + 1;
              i++;
            }
            rangename = "";
            if (jQuery.inArray(parseInt(unitModel.get('floor')), rangeArrayVal) >= 0) {
              if (value.name === "medium") {
                rangename = "mid";
              } else {
                rangename = value.name;
              }
              rangename = _.str.capitalize(rangename);
              return unitModel.set("flooRange", rangename + 'rise');
            }
          });
          viewModelArray = [];
          facingModelArray = [];
          unitTypeModel = App.master.unit_type.findWhere({
            id: unitModel.get('unitType')
          });
          unitTypeModelName = unitTypeModel.get('name').split(' ');
          unitVariantModel = App.master.unit_variant.findWhere({
            id: unitModel.get('unitVariant')
          });
          unitModel.set("sellablearea", unitVariantModel.get('sellablearea'));
          unitModel.set("carpetarea", unitVariantModel.get('carpetarea'));
          unitModel.set("terracearea", unitVariantModel.get('terracearea'));
          unitModel.set("unitTypeName", unitTypeModelName[0]);
          unitModel.set("buidlingName", buildingModel.get('name'));
          unitModel.set('TwoDimage', unitVariantModel.get('url2dlayout_image'));
          unitModel.set('ThreeDimage', unitVariantModel.get('url3dlayout_image'));
          unitModel.set('floorLayoutimage', floorLayoutimage);
          unitModel.set('BuildingPositionimage', buildingModel.get('positioninproject').image_url);
          if (unitModel.get('views_name') !== "") {
            viewsArray = unitModel.get('views_name');
            for (_k = 0, _len2 = viewsArray.length; _k < _len2; _k++) {
              element = viewsArray[_k];
              viewModel = App.master.view.findWhere({
                id: parseInt(element)
              });
              viewModelArray.push(viewModel.get('name'));
            }
          } else {
            viewModelArray.push('-----');
          }
          unitModel.set('views', viewModelArray.join(','));
          facingssArray = unitModel.get('facing_name');
          if (facingssArray.length !== 0) {
            for (_l = 0, _len3 = facingssArray.length; _l < _len3; _l++) {
              element = facingssArray[_l];
              facingModel = App.master.facings.findWhere({
                id: parseInt(element)
              });
              facingModelArray.push(facingModel.get('name'));
            }
          } else {
            facingModelArray.push('-----');
          }
          unitModel.set('facings', facingModelArray.join(','));
          roomSizesObject = unitVariantModel.get('roomsizes');
          roomsizearray = [];
          roomTypeArr = roomcoll;
          roomSizesArray = $.map(roomSizesObject, function(index, value1) {
            return [index];
          });
          terraceoptions = unitVariantModel.get('terraceoptions');
          if (terraceoptions === null) {
            terraceoptionstext = '---------';
          } else {
            terraceoptionstext = unitVariantModel.get('terraceoptions');
          }
          unitModel.set('terraceoptions', 'with ' + terraceoptionstext);
          terraceoptions = 'with ' + terraceoptionstext;
          roomsizearr = [];
          mainArr = [];
          roomsizesCollection = new Backbone.Collection(roomSizesArray);
          $.each(roomTypeArr, function(ind, val) {
            var roomtype, roomtypeid, roomtypename;
            roomsizearr = [];
            roomtypename = '';
            roomtypeid = val.id;
            roomtypename = val.name;
            roomtype = roomsizesCollection.where({
              room_type_id: parseInt(val.id)
            });
            if (roomtype !== void 0) {
              $.each(roomtype, function(index1, value1) {
                return roomsizearr.push({
                  room_size: value1.get('room_size'),
                  room_type: value1.get('room_type')
                });
              });
              roomsizearr.sort(function(a, b) {
                return b.room_size - a.room_size;
              });
              if (roomsizearr.length === 0) {
                roomsizearr.push({
                  room_size: '----'
                });
              }
              return mainArr.push({
                id: roomtypeid,
                name: roomtypename,
                subarray: roomsizearr
              });
            }
          });
          actroom = [];
          $.each(mainArr, function(ind, val) {
            classnamearr.push({
              id: val.id,
              name: val.name,
              subarray: val.subarray
            });
            return actroom.push({
              id: val.id,
              name: val.name,
              subarray: val.subarray
            });
          });
          id = "";
          actroomColl = new Backbone.Collection(actroom);
          actualroom = [];
          coll = [];
          $.each(roomcoll, function(inde, value) {
            var classname;
            classname = '';
            coll = [];
            $.each(classnamearr, function(ind, val) {
              if (parseInt(val.id) === parseInt(value.id)) {
                if (val.subarray !== '----') {
                  return coll.push({
                    id: value.id,
                    name: val.name,
                    subarray: val.subarray,
                    classname: classname
                  });
                }
              }
            });
            if (coll.length === 0) {
              return id = actroomColl.get(value);
            }
          });
          act = [];
          actroomColl.each(function(item) {
            if (id !== item.get('id')) {
              if (item.get('subarray') !== '----') {
                return act.push({
                  id: item.get('id'),
                  name: item.get('name'),
                  subarray: item.get('subarray')
                });
              } else {
                return act.push({
                  id: item.get('id'),
                  name: item.get('name'),
                  subarray: "-----------"
                });
              }
            }
          });
          unitModel.set('mainArr', act);
          unitModelArray.push(unitModel);
        }
        unitCollection = new Backbone.Collection(unitModelArray);
        this.view = view = this._getPopupView(unitCollection, act);
        return this.show(view);
      }
    };

    PopupController.prototype.getAjaxData = function() {
      var cookeArray, element, i, modelArray, object, unitModel, unitModelArray, _i, _len, _results;
      cookeArray = localStorage.getItem("cookievalue").split(',');
      unitModelArray = [];
      modelArray = [];
      i = 0;
      if (cookeArray.length !== 0) {
        _results = [];
        for (_i = 0, _len = cookeArray.length; _i < _len; _i++) {
          element = cookeArray[_i];
          unitModel = App.master.unit.findWhere({
            id: parseInt(element)
          });
          object = this;
          _results.push($.ajax({
            method: "POST",
            url: AJAXURL + '?action=get_unit_single_details',
            data: 'id=' + unitModel.get('id') + '&building=' + unitModel.get('building'),
            success: function(result) {
              var unitModel1;
              i++;
              unitModel1 = App.master.unit.findWhere({
                id: parseInt(result.id)
              });
              unitModel1.set('persqftprice', result.persqftprice);
              unitModel1.set('views_name', result.views);
              unitModel1.set('facing_name', result.facings);
              modelArray.push(unitModel1);
              if (i === cookeArray.length) {
                return object._getUnitsCountCollection(modelArray);
              }
            },
            error: function(result) {}
          }));
        }
        return _results;
      }
    };

    return PopupController;

  })(Extm.RegionController);
  return msgbus.registerController('popup', PopupController);
});
