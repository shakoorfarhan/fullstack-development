<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends \Symfony\Bundle\FrameworkBundle\Controller\AbstractController
{
    /**
     * @Route("/{reactRouting}", name="home", defaults={"reactRouting": null})
     */
    public function index()
    {
        return $this->render('default/index.html.twig');
    }

    /**
     * @Route("/api/users", name="users")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getUsers(Request $request,ManagerRegistry $doctrine)
    {
        $repository = $doctrine->getRepository(User::class);
        $pNo = $request->query->get('pageNo');
        $entityManager = $doctrine->getManager();
        $qb = $entityManager->createQueryBuilder();
        $qb->select('count(u.id)');
        $qb->from('App:User','u');
        $count = $qb->getQuery()->getSingleScalarResult();
        if (is_null($pNo)){
            $limit = $count;
            $offset = 0;
        } else {
            $limit = 5;
            $offset = $pNo*2;
        }
        if ($offset >= $count){
            $offset = $count-$limit;
        }
        $users = $repository->findBy([], null, $limit, $offset);
        $arr = array();
        foreach ($users as $user){
            $temp = array(
                'id' => $user->getId(),
                'gender' => $user->getGender(),
                'firstName' => $user->getFirstName(),
                'lastName' => $user->getLastName(),
                'titleName' => $user->getTitleName(),
                'street' => $user->getStreet(),
                'city' => $user->getCity(),
                'state' => $user->getState(),
                'postalCode' => $user->getPostalCode(),
                'email' => $user->getEmail(),
                'phone' => $user->getPhone(),
                'pictureUrl' => $user->getPictureUrl()
            );
            $arr[]=$temp;
        }
        $response = new Response();

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->setContent(json_encode($arr));

        return $response;
    }

    /**
     *
     * @Route("/api/user", name="get_user")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function getUserById(Request $request, ManagerRegistry $doctrine)
    {
        $repository = $doctrine->getRepository(User::class);
        $response = new Response();
        $id = $request->query->get('id');
        $user = $repository->findOneBy(['id'=>$id]);
        $arr = array(
            'id' => $user->getId(),
            'gender' => $user->getGender(),
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),
            'titleName' => $user->getTitleName(),
            'street' => $user->getStreet(),
            'city' => $user->getCity(),
            'state' => $user->getState(),
            'postalCode' => $user->getPostalCode(),
            'email' => $user->getEmail(),
            'phone' => $user->getPhone(),
            'pictureUrl' => $user->getPictureUrl()
        );
        $response->headers->set('Content-Type', 'application/json');
        $response->setContent(json_encode($arr));
        return $response;
    }

    /**
     *
     * @Route("/api/updateUser", name="update_user")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     */
    public function updateUser(Request $request, ManagerRegistry $doctrine){
        $repository = $doctrine->getRepository(User::class);
        $parameters = json_decode($request->getContent(), true);
        $id = $parameters['id'];
        $user = $repository->findOneBy(['id' => $id]);

        $user->setGender($parameters['gender']);
        $user->setCity($parameters['city']);
        $user->setEmail($parameters['email']);
        $user->setPhone($parameters['phone']);
        $user->setPostalCode($parameters['postalCode']);
        $user->setStreet($parameters['street']);
        $user->setTitleName($parameters['titleName']);
        $user->setFirstName($parameters['firstName']);
        $user->setLastName($parameters['lastName']);

        $em = $doctrine->getManager();
        $em->flush();
        $em->clear();
        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->setContent(json_encode(['updated' => true]));
        return $response;
    }
}
