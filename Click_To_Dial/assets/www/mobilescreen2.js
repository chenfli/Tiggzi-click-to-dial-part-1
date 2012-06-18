/*
 * JS for mobilescreen2 generated by Exadel Tiggzi
 *
 * Created on: Monday, June 18, 2012, 05:36:10 AM (PDT)
 */
/************************************
 * JS API provided by Exadel Tiggzi  *
 ************************************/
/* Setting project environment indicator */
Tiggr.env = "apk"; /* Object & array with components "name-to-id" mapping */
var n2id_buf = {
    'mobilecontentlayer3': 'j_34',
    'mobileheader3': 'j_35',
    'mobilecontainer3': 'j_36',
    'mobilegrid2': 'j_37',
    'mobilegridcell4': 'j_40',
    'popLblName': 'j_41',
    'mobilegridcell3': 'j_38',
    'mobileimage3': 'j_39',
    'telnput': 'j_42',
    'mobilebutton3': 'j_43',
    'mobilefooter3': 'j_44',
    'annotationslayer3': 'j_45',
    'mobileimage5': 'j_11',
    'mobilelabel5': 'j_12',
    'mobilegrid2': 'j_13',
    'mobilegridcell3': 'j_14',
    'Mypic': 'j_15',
    'mobilegridcell4': 'j_16',
    'MyTel': 'j_17',
    'Myname': 'j_18',
    'mobilelabel1': 'j_19',
    'mobilelabel6': 'j_20',
    'FriendsGrid': 'j_21',
    'GridPic': 'j_22',
    'mobileimage4': 'j_23',
    'GridName': 'j_24',
    'namelabel': 'j_25',
    'telLabel': 'j_26',
    'mobilelabel4': 'j_27'
};
if ("n2id" in window && window.n2id !== undefined) {
    $.extend(n2id, n2id_buf);
} else {
    window.n2id = n2id_buf;
}
Tiggr.AppPages = [{
    "name": "mobilescreen1",
    "location": "mobilescreen1.html"
}, {
    "name": "mobilescreen2",
    "location": "mobilescreen2.html"
}, {
    "name": "popup1",
    "location": "popup1.html"
}, {
    "name": "current",
    "location": "mobilescreen2.html"
}];
Tiggr.CurrentScreen = 'j_7';

function navigateTo(outcome, useAjax) {
    Tiggr.navigateTo(outcome, useAjax);
}

function adjustContentHeight() {
    Tiggr.adjustContentHeight();
}

function adjustContentHeightWithPadding() {
    Tiggr.adjustContentHeightWithPadding();
}

function unwrapAndApply(selector, content) {
    Tiggr.unwrapAndApply(selector, content);
}

function setDetailContent(pageUrl) {
    Tiggr.setDetailContent(pageUrl);
}
/**********************
 * SECURITY CONTEXTS  *
 **********************/
var xAuthSecurityContext = new XAuthSecurityContext({
    authorizationErrorStatusCodes: [401, 403],
    'consumerKey': 'syncdev@interwise.com',
    'consumerSecret': 'Aa123456',
    serviceProvider: {
        'signatureMethod': 'hmac-sha1',
        'requestTokenURL': 'https://rally1.rallydev.com/slm/webservice/1.33/subscription?stylesheet=/slm/doc/webservice/browser.xsl',
        'requestType': 'get',
        'responseDataType': 'text'
    },
    onLoginError: function(xhr, textStatus, errorThrown) {
        alert("success");
    },
    onAuthorizationError: function(xhr, textStatus, errorThrown) {
        alert("fails");
    },
});
/*******************************
 *      SERVICE SETTINGS        *
 ********************************/
/*************************
 *      SERVICES          *
 *************************/
var Contacts_service = new Tiggr.ContactsService({});
var MyData = new Tiggr.RestService({
    'url': 'https://graph.facebook.com/me/friends',
    'dataType': 'json',
    'type': 'get',
});
var getToken = new Tiggr.RestService({
    'url': 'https://graph.facebook.com/oauth/access_token',
    'dataType': 'json',
    'type': 'get',
});
var GetMyData = new Tiggr.RestService({
    'url': 'https://graph.facebook.com/me',
    'dataType': 'json',
    'type': 'get',
});
/*************************
 * NONVISUAL COMPONENTS  *
 *************************/
var datasources = [];
var _getToken = new Tiggr.DataSource(getToken, {
    'onComplete': function(jqXHR, textStatus) {
        var vars = jqXHR.responseText.split("&");
        var access_token = vars[0].split("=")[1];
        localStorage.setItem('access_token', access_token);
        try {
            graphApiData.execute({})
        } catch (ex) {
            console.log(ex.name + '  ' + ex.message);
            hideSpinner();
        };
        // refreshing JQM form elemetns
        elts = $("input[data-type='range']");
        if (elts.length != 0) elts.slider("refresh");
    },
    'onSuccess': function(data) {},
    'onError': function(jqXHR, textStatus, errorThrown) {},
    'outMappings': [],
    'inMappings': [{
        'PATH': ['client_id'],
        'ATTR': '136262643164721'
    }, {
        'PATH': ['redirect_uri'],
        'ATTR': 'http://tiggzi.com/view/25c969c6-3c0e-4ee1-a09e-54a7a042b19f/mob-screen-C96E.html'
    }, {
        'PATH': ['client_secret'],
        'ATTR': '35e6c91901a1731d274c9f11335d3ee2'
    }, {
        'PATH': ['code'],
        'ID': '___local_storage___',
        'ATTR': 'code'
    }]
});
datasources.push(_getToken);
var graphApiData = new Tiggr.DataSource(MyData, {
    'onComplete': function(jqXHR, textStatus) {
        // refreshing JQM form elemetns
        elts = $("input[data-type='range']");
        if (elts.length != 0) elts.slider("refresh");
    },
    'onSuccess': function(data) {},
    'onError': function(jqXHR, textStatus, errorThrown) {},
    'outMappings': [{
        'PATH': ['data'],
        'ID': 'FriendsGrid',
        'TRANSFORMATION': function(value, element) {
            var fbperson = localStorage.getItem("fb_" + value.name);
            var pperson = JSON.parse(fbperson);
            pperson.pic = value.picture;
            localStorage.setItem("fb_" + value.name, JSON.stringify(pperson));
        },
        'SET': [{
            'PATH': ['name'],
            'ID': 'namelabel',
            'ATTR': '@'
        }, {
            'PATH': ['name'],
            'ID': 'telLabel',
            'ATTR': '@',
            'TRANSFORMATION': function(value, element) {
                var fbperson = localStorage.getItem("fb_" + value);
                pperson = JSON.parse(fbperson);
                if (fbperson == null) {
                    var telephone = "unknown";
                    if (name == "Zohar Landau") telephone = "054-32711244";
                    fbperson = new person(value, telephone, null);
                    localStorage.setItem("fb_" + value, JSON.stringify(fbperson));
                    pperson = fbperson;
                }
                return "Tel: " + pperson.tel;
            }
        }, {
            'PATH': ['name'],
            'ATTR': 'text'
        }, {
            'PATH': ['name'],
            'ID': undefined,
            'ATTR': '',
            'TRANSFORMATION': function(value, element) {
                var fbperson = localStorage.getItem("fb_" + value);
                pperson = JSON.parse(fbperson);
                if (fbperson == null) {
                    var tel = "unkown";
                    if (value == "Zohar Landau") tel = "054-32711244";
                    fbperson = new person(value, tel, null);
                    localStorage.setItem("fb_" + value, JSON.stringify(fbperson));
                    pperson = fbperson;
                }
                return "Tel: " + pperson.tel;
            }
        }, {
            'PATH': ['picture'],
            'ID': 'mobileimage4',
            'ATTR': 'src'
        }]
    }],
    'inMappings': [{
        'PATH': ['access_token'],
        'ID': '___local_storage___',
        'ATTR': 'access_token'
    }, {
        'PATH': ['fields'],
        'ATTR': 'id,name,picture'
    }]
});
datasources.push(graphApiData);
var _getMyData = new Tiggr.DataSource(GetMyData, {
    'onComplete': function(jqXHR, textStatus) {
        // refreshing JQM form elemetns
        elts = $("input[data-type='range']");
        if (elts.length != 0) elts.slider("refresh");
    },
    'onSuccess': function(data) {},
    'onError': function(jqXHR, textStatus, errorThrown) {},
    'outMappings': [{
        'PATH': ['username'],
        'ID': 'Mypic',
        'ATTR': 'src',
        'TRANSFORMATION': function(value, element) {
            return "http://graph.facebook.com/" + value + "/picture";
        }
    }, {
        'PATH': ['name'],
        'ID': 'Myname',
        'ATTR': '@'
    }, {
        'PATH': ['name'],
        'ID': 'MyTel',
        'ATTR': '@',
        'TRANSFORMATION': function(value, element) {
            var fbperson = localStorage.getItem("fb_" + value);
            pperson = JSON.parse(fbperson);
            if (fbperson == null) {
                var tel = "unknown";
                fbperson = new person(value, tel, null);
                localStorage.setItem("fb_" + value, JSON.stringify(fbperson));
                pperson = fbperson;
            }
            return "Tel: " + pperson.tel;
        }
    }],
    'inMappings': [{
        'PATH': ['access_token'],
        'ID': '___local_storage___',
        'ATTR': 'access_token'
    }]
});
datasources.push(_getMyData);
/************************
 * EVENTS AND HANDLERS  *
 ************************/
// screen onload
screen_C96E_onLoad = j_7_onLoad = function() {
    createSpinner("res/lib/jquerymobile/images/ajax-loader.gif");
    Tiggr.__registerComponent('mobilecontentlayer3', new Tiggr.BaseComponent({
        id: 'mobilecontentlayer3',
        context: '#'
    }));
    Tiggr.__registerComponent('mobileheader3', new Tiggr.BaseComponent({
        id: 'mobileheader3',
        context: '#j_35'
    }));
    Tiggr.__registerComponent('mobilecontainer3', new Tiggr.BaseComponent({
        id: 'mobilecontainer3',
        context: '#j_36'
    }));
    Tiggr.__registerComponent('mobilegrid2', new Tiggr.BaseComponent({
        id: 'mobilegrid2',
        context: '#j_36'
    }));
    Tiggr.__registerComponent('mobilegridcell4', new Tiggr.BaseComponent({
        id: 'mobilegridcell4',
        context: '#j_36'
    }));
    Tiggr.__registerComponent('popLblName', new Tiggr.BaseComponent({
        id: 'popLblName',
        context: '#j_36'
    }));
    Tiggr.__registerComponent('mobilegridcell3', new Tiggr.BaseComponent({
        id: 'mobilegridcell3',
        context: '#j_36'
    }));
    Tiggr.__registerComponent('mobileimage3', new Tiggr.BaseComponent({
        id: 'mobileimage3',
        context: '#j_36'
    }));
    Tiggr.__registerComponent('telnput', new Tiggr.BaseComponent({
        id: 'telnput',
        context: '#j_36'
    }));
    Tiggr.__registerComponent('mobilebutton3', new Tiggr.BaseComponent({
        id: 'mobilebutton3',
        context: '#j_36'
    }));
    Tiggr.__registerComponent('mobilefooter3', new Tiggr.BaseComponent({
        id: 'mobilefooter3',
        context: '#j_44'
    }));
    Tiggr.__registerComponent('annotationslayer3', new Tiggr.BaseComponent({
        id: 'annotationslayer3',
        context: '#'
    }));
    Tiggr.__registerComponent('mobileimage5', new Tiggr.BaseComponent({
        id: 'mobileimage5',
        context: '#j_10'
    }));
    Tiggr.__registerComponent('mobilelabel5', new Tiggr.BaseComponent({
        id: 'mobilelabel5',
        context: '#j_10'
    }));
    Tiggr.__registerComponent('mobilegrid2', new Tiggr.BaseComponent({
        id: 'mobilegrid2',
        context: '#j_10'
    }));
    Tiggr.__registerComponent('mobilegridcell3', new Tiggr.BaseComponent({
        id: 'mobilegridcell3',
        context: '#j_10'
    }));
    Tiggr.__registerComponent('Mypic', new Tiggr.BaseComponent({
        id: 'Mypic',
        context: '#j_10'
    }));
    Tiggr.__registerComponent('mobilegridcell4', new Tiggr.BaseComponent({
        id: 'mobilegridcell4',
        context: '#j_10'
    }));
    Tiggr.__registerComponent('MyTel', new Tiggr.BaseComponent({
        id: 'MyTel',
        context: '#j_10'
    }));
    Tiggr.__registerComponent('Myname', new Tiggr.BaseComponent({
        id: 'Myname',
        context: '#j_10'
    }));
    Tiggr.__registerComponent('mobilelabel1', new Tiggr.BaseComponent({
        id: 'mobilelabel1',
        context: '#j_10'
    }));
    Tiggr.__registerComponent('mobilelabel6', new Tiggr.BaseComponent({
        id: 'mobilelabel6',
        context: '#j_10'
    }));
    Tiggr.__registerComponent('FriendsGrid', new Tiggr.BaseComponent({
        id: 'FriendsGrid',
        context: '#j_10'
    }));
    Tiggr.__registerComponent('GridPic', new Tiggr.BaseComponent({
        id: 'GridPic',
        context: '#j_10'
    }));
    Tiggr.__registerComponent('mobileimage4', new Tiggr.BaseComponent({
        id: 'mobileimage4',
        context: '#j_10'
    }));
    Tiggr.__registerComponent('GridName', new Tiggr.BaseComponent({
        id: 'GridName',
        context: '#j_10'
    }));
    Tiggr.__registerComponent('namelabel', new Tiggr.BaseComponent({
        id: 'namelabel',
        context: '#j_10'
    }));
    Tiggr.__registerComponent('telLabel', new Tiggr.BaseComponent({
        id: 'telLabel',
        context: '#j_10'
    }));
    Tiggr.__registerComponent('mobilelabel4', new Tiggr.BaseComponent({
        id: 'mobilelabel4',
        context: '#j_10'
    }));
    for (var idx = 0; idx < datasources.length; idx++) {
        datasources[idx].__setupDisplay();
    }
    screen_C96E_elementsExtraJS();
    var vars = [];
    var params = window.top.location.href.slice(window.top.location.href.indexOf('?'));
    params = params.slice(1).split('&');
    for (var i in params) {
        var item = params[i].split('=');
        vars.push(item[0]);
        vars[item[0]] = item[1];
    }
    if (vars.code != null) localStorage.setItem('code', vars.code + '=_');
    try {
        _getToken.execute({})
    } catch (ex) {
        console.log(ex.name + '  ' + ex.message);
        hideSpinner();
    };
    try {
        _getMyData.execute({})
    } catch (ex) {
        console.log(ex.name + '  ' + ex.message);
        hideSpinner();
    };
    j_7_deviceEvents();
    j_7_windowEvents();
    screen_C96E_elementsEvents();
}
// screen window events
screen_C96E_windowEvents = j_7_windowEvents = function() {
    $('#j_7').bind('pageshow orientationchange', function() {
        adjustContentHeightWithPadding();
    });
}
// device events
j_7_deviceEvents = function() {
    document.addEventListener("deviceready", function() {});
}
// screen elements extra js
screen_C96E_elementsExtraJS = j_7_elementsExtraJS = function() {
    // screen (screen-C96E) extra code
}
// screen elements handler
screen_C96E_elementsEvents = j_7_elementsEvents = function() {
    $("a :input,a a,a fieldset label").live({
        click: function(event) {
            event.stopPropagation();
        }
    });
    $('#j_10 [name="MyTel"]').die().live({
        vclick: function() {
            if (!$(this).attr('disabled')) {
                Tiggr.navigateTo('popup1', {
                    transition: 'pop'
                });
                setVar_('CurTel', 'j_18', 'text', '', this);
            }
        },
    });
    $('#j_10 [name="telLabel"]').die().live({
        vclick: function() {
            if (!$(this).attr('disabled')) {
                setVar_('CurTel', 'j_25', 'text', '', this);
                Tiggr.navigateTo('popup1', {
                    transition: 'pop'
                });
            }
        },
    });
    $('#j_10 [name="mobilelabel4"]').die().live({
        vclick: function() {
            if (!$(this).attr('disabled')) {
                setVar_('CallMe', 'j_25', 'text', '', this);
                var myfbperson = localStorage.getItem("fb_" + Tiggr('Myname').text());
                mypperson = JSON.parse(myfbperson);
                var callme = localStorage.getItem("CallMe");
                var otherfbperson = localStorage.getItem("fb_" + callme);
                otherperson = JSON.parse(otherfbperson);
                var phone1 = mypperson.tel;
                var phone2 = otherperson.tel;
                var foundryurl = 'https://auth.tfoundry.com/oauth/authorize?client_id=3ae89f7209498c083997639e220b9a27&scope=NASB&redirect_uri=http://www.tiggzi.com/view/3f6ca50e-c260-471f-a6cc-70c890c24f24/mob-Result.html?phones=' + phone1 + '_' + phone2 + '&response_type=code';
                window.open(foundryurl);
            }
        },
    });
}
$("body").undelegate("pagebeforeshow").delegate("#j_7", "pagebeforeshow", function(event, ui) {
    j_7_onLoad();
});