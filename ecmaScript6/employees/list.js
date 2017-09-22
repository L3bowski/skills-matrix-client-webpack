(function (ajax, paginatedListUtils) {

    var viewName = 'employeesList';
    var employeeslistReduxId = 'employees-list';
    var employeeslistHtmlId = 'employees-list-wrapper';

    function employeesFetcher(state) {
        return ajax.get('/api/employee', {
            keywords: state.keywords,
            page: state.page + state.pageOffset,
            pageSize: state.pageSize
        }, paginatedListUtils.getDefaultResults());
    }

    var viewReducer = paginatedListUtils.getReducer(employeeslistReduxId);

    var viewRenderer = paginatedListUtils.getRenderer(employeeslistHtmlId, '<i>No employees found</i>',
    function (employee) {
        return '<li class="list-group-item"><a class="reset" href="/employees/details?id=' +
        employee.Id + '">' + employee.Name + '</a></li>';
    });

    var actionBinders = function(store) {
        var htmlNodes = paginatedListUtils.getHtmlNodes(employeeslistHtmlId);
        var actionDispatchers = paginatedListUtils.getActionDispatchers(
            store,
            employeeslistReduxId,
            employeesFetcher,
            viewName
        );
        paginatedListUtils.bindDefaultEventHandlers(htmlNodes, actionDispatchers);
    };

    
    var viewLoader = function(pageData, store) {            
        store.dispatch({
            type: 'paginatedListInitialize',
            listId: employeeslistReduxId,
            config: {
                hasSearcher: true,
                hasPagination: true
            }
        });

        return employeesFetcher(store.getState()[viewName])
        .then(function(results) {
            store.dispatch({
                type: 'paginatedListResults',
                listId: employeeslistReduxId,
                results
            });
        });
    };
    
    window.Views = window.Views || [];
    window.Views.push({
        name: viewName,
        htmlNodeId: 'employees-list-section',
        reducer: viewReducer,
        renderer: viewRenderer,
        actionBinders,
        loader: viewLoader
    });

})(window.Ajax, window.PaginatedListUtils);
