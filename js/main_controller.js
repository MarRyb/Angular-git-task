gitApp.controller('MainController', ['$scope', '$http',
	function($scope, $http) {
		$scope.commits = [];
		$scope.nickName = "thoughtbot";
		$scope.nameRepos = "guides";
		$scope.import = function(){
			$http({
				method: 'GET',
				url: 'https://api.github.com/repos/'+ $scope.nickName +'/' + $scope.nameRepos + '/commits'
			}).then(function(response){
				if (response.headers("Link") != null) {
				link = response.headers("Link").split(', ');
				link = link[link.length -1].split(';');
				link = link[0].substring(1, link[0].length -1);
				$scope.linkUrl = link.split('=');
				$scope.linkUrl1 = $scope.linkUrl[0];
				$scope.linkUrl2 = parseInt($scope.linkUrl[1]);
				} else {
					$scope.linkUrl2 = 1;
				};
				$scope.currentPage = 1;
				$scope.commits = response.data;	
			})
		}
		$scope.pagination = function(n) {
			return new Array(n);
		}
		$scope.goTo = function(n) {
			$http({
				method: 'GET',
				url: $scope.linkUrl1 + "=" + n 
			}).then(function(response){
				$scope.commits = response.data;	
				$scope.currentPage = n;
			})
		}
		$scope.currentPage = 1;
		$scope.linkUrl2 = 1;
}]);