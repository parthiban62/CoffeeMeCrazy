var viewModel = {
  // /// 1
  flash: ko.observable(),
  // /// 2
  shownOnce: ko.observable(),
  // /// 3
  currentPage: ko.observable(),
  // /// 4
  errors: ko.observableArray(),
  // /// 5
  items: ko.observableArray(),
  // /// 6
  selectedItem: ko.observable(),
  // /// 7
  tempItem: {
    id: ko.observable(),
    name: ko.observable(),
    description: ko.observable(),
    location: ko.observable(),
    is_tried: ko.observable(),
    updated_at: ko.observable(),
    created_at: ko.observable()
  },

  // /// 8
  setFlash: function(flash) {
    this.flash(flash);
    this.shownOnce(false);
  },
  // /// 9
  checkFlash: function() {
    if (this.shownOnce() == true) {
      this.flash('');
    }
  },
  // /// 10
  clearTempItem: function() {
    this.tempItem.id('');
    this.tempItem.name('');
    this.tempItem.location('');
    this.tempItem.description('');
    this.tempItem.is_tried('');
    this.tempItem.updated_at('');
    this.tempItem.created_at('');
  },
  // /// 11
  prepareTempItem : function() {
    this.tempItem.id(ko.utils.unwrapObservable(this.selectedItem().id));
    this.tempItem.name(ko.utils.unwrapObservable(this.selectedItem().title));
    this.tempItem.description(ko.utils.unwrapObservable(this.selectedItem().title));
    this.tempItem.location(ko.utils.unwrapObservable(this.selectedItem().body));
    this.tempItem.is_tried(ko.utils.unwrapObservable(this.selectedItem().body));
    this.tempItem.updated_at(ko.utils.unwrapObservable(this.selectedItem().updated_at));
    this.tempItem.created_at(ko.utils.unwrapObservable(this.selectedItem().created_at));
  },
  // /// 12
  indexAction: function() {
    this.checkFlash();
    $.getJSON('/coffee_beans.json', function(data) {
      viewModel.items(data);
      viewModel.currentPage('index');
      viewModel.shownOnce(true);
    });
  },
  // /// 13
  showAction: function(itemToShow) {
    this.checkFlash();
    this.errors([]);
    this.selectedItem(itemToShow);
    this.currentPage('show');
    this.shownOnce(true);
  },
  // /// 14
  newAction: function() {
    this.checkFlash();
    this.currentPage('new');
    this.clearTempItem();
    this.shownOnce(true);
  },
  // /// 15
  editAction: function(itemToEdit) {
    this.checkFlash();
    this.selectedItem(itemToEdit);
    this.prepareTempItem();
    this.currentPage('edit');
    this.shownOnce(true);
  },
  // /// 16
  createAction: function(itemToCreate) {
    var json_data = ko.toJS(itemToCreate);
    $.ajax({
      type: 'POST',
      url: '/coffee_beans.json',
      data: {
        // /// 17
        coffee_bean: json_data
      },
      dataType: "json",
      success: function(createdItem) {
        viewModel.errors([]);
        viewModel.setFlash('Coffee bean successfully created.');
        viewModel.clearTempItem();
        viewModel.showAction(createdItem);
      },
      error: function(msg) {
        viewModel.errors(JSON.parse(msg.responseText));
      }
    });
  },
  // /// 18
  updateAction: function(itemToUpdate) {
    var json_data = ko.toJS(itemToUpdate);
    delete json_data.id;
    delete json_data.created_at;
    delete json_data.updated_at;

    $.ajax({
      type: 'PUT',
      url: '/coffee_beans/' + itemToUpdate.id() + '.json',
      data: {
        post: json_data
      },
      dataType: "json",
      success: function(updatedItem) {
        viewModel.errors([]);
        viewModel.setFlash('Coffee bean successfully updated.');
        viewModel.showAction(updatedItem);
      },
      error: function(msg) {
        viewModel.errors(JSON.parse(msg.responseText));
      }
    });
  },
  // /// 19
  destroyAction: function(itemToDestroy) {
    if (confirm('Are you sure?')) {
      $.ajax({
        type: "DELETE",
        url: '/coffee_beans/' + itemToDestroy.id + '.json',
        dataType: "json",
        success: function(){
          viewModel.errors([]);
          viewModel.setFlash('Coffee bean successfully deleted.');
          viewModel.indexAction();
        },
        error: function(msg) {
          viewModel.errors(JSON.parse(msg.responseText));
        }
      });
    }
  },
    // /// 20
  createCommentAction: function(itemToCreate) {
  var json_data = ko.toJS(itemToCreate);
    $.ajax({
      type: 'POST',
      url: '/comments.json',
      data: {
        // /// 17
        comment: json_data
      },
      dataType: "json",
      success: function(createdItem) {
        viewModel.errors([]);
        viewModel.setFlash('Comment successfully created.');
        viewModel.clearTempItem();
        viewModel.indexAction();
      },
      error: function(msg) {
        viewModel.errors(JSON.parse(msg.responseText));
      }
    });
  },
};

// /// 21
$(document).ready(function() {
  ko.applyBindings(viewModel);
  viewModel.indexAction();
  viewModel.clearTempItem();
});