/* global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};
define(function(require) {
	
	var Backbone = require('backbone');
	var _ = require('underscore');
	var WorkspaceView = require('views/workspace-view');
	var WorkspaceEvents = require('events/workspace-event');
	var ProjectEvents = require('events/project-event');
	var ConversationEvents = require('events/conversation-event');
	var tree = require('utils/tree');
	
	var WorkspaceCollection = require('collections/workspaces'); //TODO : REMOVE FROM HERE

    var AppView = Backbone.View.extend({
		events : {
	
		},
		workspaceId : '',
		projectId : '',
		initialize : function() {
			app.workspaces = new WorkspaceCollection(); //TODO: REMOVE FROM HERE
		    var view = new WorkspaceView({
		    	model : app.workspaces
		    });
		    view.showDefault();
		    this.listenTo(app.Events, WorkspaceEvents.CHANGE,this.handleWorkspaceChange);
		    this.listenTo(app.Events, ProjectEvents.CHANGE ,this.handleProjectChange);
		    this.listenTo(app.Events,ConversationEvents.CHANGE,this.handleConversationChange);
		    this.render();
		},
		
		handleWorkspaceChange : function(id){
			console.log('workspace changed :' + id);
			tree.resetTree();
			this.workspaceId = id;
		},
		handleProjectChange : function(id){
			console.log('project changed :'+ id);
			this.projectId = id;
		},
		handleConversationChange : function(id){
			console.log('conversation changed :'+ id);
			this.conversationId = id;
		},
		getCurrentWorkspaceId : function(){
			return this.workspaceId;
		},
		getCurrentProjectId : function(){
			return this.projectId;
		},
		getCurrentConversationId : function(){
			return this.conversationId;
		},
		render : function() {
		    console.log("app-view#render");
		}
    });
    return AppView;  
});
